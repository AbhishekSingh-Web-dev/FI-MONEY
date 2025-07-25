import requests
import json

# Set the base URL to your running server instance
BASE_URL = "http://localhost:5000/api"

def print_result(test_name, passed, expected=None, got=None, request_data=None, response_body=None):
    """
    Prints the test result. If failed, provides detailed information.
    """
    if passed:
        print(f"{test_name}: PASSED")
    else:
        print(f"--- {test_name}: FAILED ---")
        if request_data:
            print(f"  Request Body: {json.dumps(request_data)}")
        if expected is not None and got is not None:
            print(f"  Expected: {expected}, Got: {got}")
        if response_body:
            # Try to pretty-print JSON, otherwise print raw text
            try:
                print(f"  Response Body: {json.dumps(response_body, indent=2)}")
            except (json.JSONDecodeError, TypeError):
                print(f"  Response Body: {response_body}")
        print("-" * (len(test_name) + 10))


def test_register_user():
    """Tests the user registration endpoint."""
    print("\n--- Testing User Registration ---")
    payload = {"username": "testuser_python", "password": "password123"}
    # Your API returns 200 OK on register, not 201
    res = requests.post(f"{BASE_URL}/auth/register", json=payload)
    # Expect 200 (OK) or 409 (Conflict if user already exists)
    passed = res.status_code in [200, 409]
    print_result("User Registration", passed, "200 or 409", res.status_code, payload, res.text)
    return passed

def test_login():
    """Tests the login endpoint and returns the auth token."""
    print("\n--- Testing User Login ---")
    payload = {"username": "testuser_python", "password": "password123"}
    res = requests.post(f"{BASE_URL}/auth/login", json=payload)
    token = None
    passed = False
    response_json = None
    if res.status_code == 200:
        try:
            response_json = res.json()
            token = response_json.get("access_token")
            passed = token is not None
        except json.JSONDecodeError:
            passed = False
    print_result("User Login", passed, "A valid access_token", token, payload, response_json or res.text)
    return token

def test_add_product(token):
    """Tests adding a product and returns the new product's ID."""
    print("\n--- Testing Add Product ---")
    payload = {
        "name": "Python Test Phone",
        "type": "Electronics",
        "sku": "PY-PHN-001",
        "image_url": "https://example.com/phone.jpg",
        "description": "A phone added via Python script",
        "quantity": 10,
        "price": 899.99
    }
    headers = {"Authorization": f"Bearer {token}"}
    # Your API may return 200 or 201, let's check for both
    res = requests.post(f"{BASE_URL}/products", json=payload, headers=headers)
    product_id = None
    passed = False
    response_json = None
    if res.status_code in [200, 201]:
        try:
            response_json = res.json()
            # **FIXED**: Looking for 'product_id' as returned by your API
            product_id = response_json.get("product_id")
            if not product_id: # Fallback for other possible response structures
                 product_id = response_json.get("_id")
            passed = product_id is not None
        except json.JSONDecodeError:
            passed = False
    print_result("Add Product", passed, "A valid product ID", product_id, payload, response_json or res.text)
    return product_id

def test_update_quantity(token, product_id, new_quantity):
    """Tests updating the quantity of a specific product."""
    print(f"\n--- Testing Update Quantity to {new_quantity} ---")
    payload = {"quantity": new_quantity}
    headers = {"Authorization": f"Bearer {token}"}
    res = requests.put(f"{BASE_URL}/products/{product_id}/quantity", json=payload, headers=headers)
    passed = res.status_code == 200
    print_result("Update Quantity", passed, 200, res.status_code, payload, res.text)
    return passed

def test_get_products(token, expected_product_name, expected_quantity):
    """Tests fetching products and verifies the quantity of a specific product."""
    print("\n--- Testing Get Products ---")
    headers = {"Authorization": f"Bearer {token}"}
    res = requests.get(f"{BASE_URL}/products", headers=headers)

    if res.status_code != 200:
        print_result("Get Products (Status Check)", False, 200, res.status_code, None, res.text)
        return

    try:
        # Your API may return a list directly or a paginated object
        response_data = res.json()
        products_list = response_data if isinstance(response_data, list) else response_data.get('products', [])

        test_product = next((p for p in products_list if p.get("name") == expected_product_name), None)

        if not test_product:
            print_result(f"Get Products (Find {expected_product_name})", False, "Product to be found", "Not Found", None, res.json())
            return

        got_quantity = test_product.get("quantity")
        passed = got_quantity == expected_quantity
        print_result(f"Get Products (Verify Quantity for {expected_product_name})", passed, expected_quantity, got_quantity, None, res.json())

    except (json.JSONDecodeError, AttributeError):
        print_result("Get Products (JSON Parsing)", False, "Valid JSON response", "Invalid or unexpected JSON format", None, res.text)

def run_all_tests():
    """Runs all API tests in sequence."""
    print("======== STARTING API TEST SUITE ========")
    if not test_register_user():
        print("\nRegistration test failed. It might be because the user already exists, which is okay. Continuing to login.")

    token = test_login()
    if not token:
        print("\nLogin failed. Cannot proceed with authenticated tests.")
        return

    product_id = test_add_product(token)
    if not product_id:
        print("\nAdd Product test failed. Cannot proceed with update/get tests.")
        return

    new_quantity = 25
    if not test_update_quantity(token, product_id, new_quantity):
        print("\nUpdate Quantity test failed.")
        return

    test_get_products(token, expected_product_name="Python Test Phone", expected_quantity=new_quantity)
    print("\n======== API TEST SUITE FINISHED ========")

if __name__ == "__main__":
    run_all_tests()
