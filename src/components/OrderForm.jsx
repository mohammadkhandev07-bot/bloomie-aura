import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiUser, 
  FiPhone, 
  FiMapPin, 
  FiHome, 
  FiMail,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
  FiPackage,
  FiTruck,
  FiCreditCard,
  FiLock
} from 'react-icons/fi';

const OrderForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [pincodeData, setPincodeData] = useState(null);
  const [isPincodeLoading, setIsPincodeLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    candleType: 'vanilla',
    quantity: 1,
    specialInstructions: '',
    paymentMethod: 'cod'
  });

  // Candle options
  const candleOptions = [
    { value: 'vanilla', label: 'Vanilla Bliss', price: 499 },
    { value: 'lavender', label: 'Lavender Dream', price: 599 },
    { value: 'rose', label: 'Rose Garden', price: 699 },
    { value: 'jasmine', label: 'Jasmine Evening', price: 549 },
    { value: 'sandalwood', label: 'Sandalwood Serenity', price: 799 },
    { value: 'cinnamon', label: 'Cinnamon Spice', price: 449 }
  ];

  // Auto-detect pincode (mock API - real mein API call karenge)
  useEffect(() => {
    if (formData.pincode.length === 6) {
      fetchPincodeDetails(formData.pincode);
    } else {
      setPincodeData(null);
    }
  }, [formData.pincode]);

  const fetchPincodeDetails = async (pincode) => {
    setIsPincodeLoading(true);
    try {
      // Mock API call - real mein ye API se data aayega
      // const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      // const data = await response.json();
      
      // Mock data for demo
      setTimeout(() => {
        const mockData = {
          city: 'Mumbai',
          state: 'Maharashtra',
          district: 'Mumbai City'
        };
        setPincodeData(mockData);
        setFormData(prev => ({
          ...prev,
          city: mockData.city,
          state: mockData.state
        }));
        setIsPincodeLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching pincode:', error);
      setIsPincodeLoading(false);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Phone number validation (only digits)
    if (name === 'phone') {
      const phoneRegex = /^[0-9]*$/;
      if (!phoneRegex.test(value) && value !== '') return;
      if (value.length > 10) return;
    }

    // Pincode validation (only digits)
    if (name === 'pincode') {
      const pincodeRegex = /^[0-9]*$/;
      if (!pincodeRegex.test(value) && value !== '') return;
      if (value.length > 6) return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    // Full Name
    if (!formData.fullName.trim()) {
      errors.fullName = 'Please enter your full name';
    } else if (formData.fullName.trim().length < 3) {
      errors.fullName = 'Name must be at least 3 characters';
    }

    // Email
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    // Phone
    if (!formData.phone) {
      errors.phone = 'Please enter your phone number';
    } else if (formData.phone.length !== 10) {
      errors.phone = 'Phone number must be 10 digits';
    }

    // Address
    if (!formData.address.trim()) {
      errors.address = 'Please enter your address';
    } else if (formData.address.trim().length < 5) {
      errors.address = 'Address must be at least 5 characters';
    }

    // City
    if (!formData.city.trim()) {
      errors.city = 'Please enter your city';
    }

    // State
    if (!formData.state.trim()) {
      errors.state = 'Please enter your state';
    }

    // Pincode
    if (!formData.pincode) {
      errors.pincode = 'Please enter your pincode';
    } else if (formData.pincode.length !== 6) {
      errors.pincode = 'Pincode must be 6 digits';
    }

    // Candle Type
    if (!formData.candleType) {
      errors.candleType = 'Please select a candle';
    }

    // Quantity
    if (formData.quantity < 1 || formData.quantity > 10) {
      errors.quantity = 'Quantity must be between 1 and 10';
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare order data
      const orderData = {
        ...formData,
        selectedCandle: candleOptions.find(c => c.value === formData.candleType),
        totalAmount: calculateTotal(),
        orderDate: new Date().toISOString()
      };

      // Send to backend
      // const response = await fetch('https://your-backend.com/api/order', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(orderData)
      // });
      // const result = await response.json();

      // Mock success
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        
        // Redirect to success page after 2 seconds
        setTimeout(() => {
          navigate('/success', { 
            state: { 
              orderData: orderData,
              orderId: 'ORD-' + Date.now().toString().slice(-6)
            }
          });
        }, 2000);
      }, 1500);

    } catch (error) {
      console.error('Order submission error:', error);
      setIsSubmitting(false);
      alert('Something went wrong! Please try again.');
    }
  };

  // Calculate total
  const calculateTotal = () => {
    const selectedCandle = candleOptions.find(c => c.value === formData.candleType);
    if (!selectedCandle) return 0;
    return selectedCandle.price * formData.quantity;
  };

  // Get selected candle details
  const selectedCandle = candleOptions.find(c => c.value === formData.candleType);

  // If success, show success message
  if (isSuccess) {
    return (
      <div className="order-success">
        <FiCheckCircle className="success-icon" />
        <h2>Order Placed Successfully! 🎉</h2>
        <p>Your order is being processed. You will receive a confirmation shortly.</p>
        <div className="success-spinner">
          <FiLoader className="spinner" />
          <span>Redirecting...</span>
        </div>
        <style jsx>{`
          .order-success {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
            padding: 2rem;
            text-align: center;
          }
          .success-icon {
            font-size: 4rem;
            color: #4CAF50;
            animation: bounceIn 0.6s ease;
          }
          @keyframes bounceIn {
            0% { transform: scale(0); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1); }
          }
          .order-success h2 {
            color: #2C1810;
            margin: 1rem 0 0.5rem;
          }
          .order-success p {
            color: #5A3D2E;
            max-width: 400px;
          }
          .success-spinner {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 2rem;
            color: #D4AF37;
          }
          .spinner {
            animation: spin 1s linear infinite;
            font-size: 1.5rem;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="order-form-wrapper">
      <div className="order-form-container">
        {/* ===== FORM HEADER ===== */}
        <div className="form-header">
          <h1 className="form-title">
            <FiPackage className="title-icon" />
            Place Your Order
          </h1>
          <p className="form-subtitle">
            Fill in the details below to place your order. We'll deliver it to your doorstep! 🕯️
          </p>
        </div>

        <form onSubmit={handleSubmit} className="order-form" noValidate>
          <div className="form-grid">
            {/* ===== LEFT COLUMN - Customer Details ===== */}
            <div className="form-column">
              <h2 className="section-heading">
                <FiUser className="heading-icon" />
                Customer Details
              </h2>

              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">
                  Full Name <span className="required">*</span>
                </label>
                <div className={`input-wrapper ${formErrors.fullName ? 'error' : ''}`}>
                  <FiUser className="input-icon" />
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="form-input"
                  />
                </div>
                {formErrors.fullName && (
                  <span className="error-message">
                    <FiAlertCircle /> {formErrors.fullName}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address <span className="required">*</span>
                </label>
                <div className={`input-wrapper ${formErrors.email ? 'error' : ''}`}>
                  <FiMail className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="form-input"
                  />
                </div>
                {formErrors.email && (
                  <span className="error-message">
                    <FiAlertCircle /> {formErrors.email}
                  </span>
                )}
              </div>

              {/* Phone */}
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number <span className="required">*</span>
                </label>
                <div className={`input-wrapper ${formErrors.phone ? 'error' : ''}`}>
                  <FiPhone className="input-icon" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter 10-digit phone number"
                    className="form-input"
                    maxLength="10"
                  />
                </div>
                {formErrors.phone && (
                  <span className="error-message">
                    <FiAlertCircle /> {formErrors.phone}
                  </span>
                )}
              </div>

              {/* Address */}
              <div className="form-group">
                <label htmlFor="address" className="form-label">
                  Address <span className="required">*</span>
                </label>
                <div className={`input-wrapper ${formErrors.address ? 'error' : ''}`}>
                  <FiHome className="input-icon" />
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House/Flat number, Street, Locality"
                    className="form-input"
                  />
                </div>
                {formErrors.address && (
                  <span className="error-message">
                    <FiAlertCircle /> {formErrors.address}
                  </span>
                )}
              </div>

              {/* Landmark */}
              <div className="form-group">
                <label htmlFor="landmark" className="form-label">
                  Landmark <span className="optional">(Optional)</span>
                </label>
                <div className="input-wrapper">
                  <FiMapPin className="input-icon" />
                  <input
                    type="text"
                    id="landmark"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    placeholder="Nearby landmark for easy delivery"
                    className="form-input"
                  />
                </div>
              </div>

              {/* City, State, Pincode Grid */}
              <div className="form-row">
                <div className="form-group form-group-half">
                  <label htmlFor="city" className="form-label">
                    City <span className="required">*</span>
                  </label>
                  <div className={`input-wrapper ${formErrors.city ? 'error' : ''}`}>
                    <FiMapPin className="input-icon" />
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="form-input"
                    />
                  </div>
                  {formErrors.city && (
                    <span className="error-message">
                      <FiAlertCircle /> {formErrors.city}
                    </span>
                  )}
                </div>

                <div className="form-group form-group-half">
                  <label htmlFor="state" className="form-label">
                    State <span className="required">*</span>
                  </label>
                  <div className={`input-wrapper ${formErrors.state ? 'error' : ''}`}>
                    <FiMapPin className="input-icon" />
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="State"
                      className="form-input"
                    />
                  </div>
                  {formErrors.state && (
                    <span className="error-message">
                      <FiAlertCircle /> {formErrors.state}
                    </span>
                  )}
                </div>
              </div>

              {/* Pincode */}
              <div className="form-group">
                <label htmlFor="pincode" className="form-label">
                  Pincode <span className="required">*</span>
                </label>
                <div className={`input-wrapper ${formErrors.pincode ? 'error' : ''}`}>
                  <FiMapPin className="input-icon" />
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter 6-digit pincode"
                    className="form-input"
                    maxLength="6"
                  />
                  {isPincodeLoading && (
                    <FiLoader className="input-loader" />
                  )}
                  {pincodeData && !isPincodeLoading && (
                    <FiCheckCircle className="input-check" />
                  )}
                </div>
                {formErrors.pincode && (
                  <span className="error-message">
                    <FiAlertCircle /> {formErrors.pincode}
                  </span>
                )}
                {pincodeData && !isPincodeLoading && (
                  <span className="success-message">
                    <FiCheckCircle /> City & State auto-filled!
                  </span>
                )}
              </div>
            </div>

            {/* ===== RIGHT COLUMN - Order Details ===== */}
            <div className="form-column">
              <h2 className="section-heading">
                <FiPackage className="heading-icon" />
                Order Details
              </h2>

              {/* Candle Type */}
              <div className="form-group">
                <label htmlFor="candleType" className="form-label">
                  Select Candle <span className="required">*</span>
                </label>
                <div className={`input-wrapper ${formErrors.candleType ? 'error' : ''}`}>
                  <select
                    id="candleType"
                    name="candleType"
                    value={formData.candleType}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {candleOptions.map(candle => (
                      <option key={candle.value} value={candle.value}>
                        {candle.label} - ₹{candle.price}
                      </option>
                    ))}
                  </select>
                </div>
                {formErrors.candleType && (
                  <span className="error-message">
                    <FiAlertCircle /> {formErrors.candleType}
                  </span>
                )}
              </div>

              {/* Quantity */}
              <div className="form-group">
                <label htmlFor="quantity" className="form-label">
                  Quantity <span className="required">*</span>
                </label>
                <div className={`input-wrapper ${formErrors.quantity ? 'error' : ''}`}>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="1"
                    max="10"
                    className="form-input quantity-input"
                  />
                  <div className="quantity-controls">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => {
                        if (formData.quantity > 1) {
                          setFormData(prev => ({
                            ...prev,
                            quantity: prev.quantity - 1
                          }));
                        }
                      }}
                    >
                      -
                    </button>
                    <span className="qty-value">{formData.quantity}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => {
                        if (formData.quantity < 10) {
                          setFormData(prev => ({
                            ...prev,
                            quantity: prev.quantity + 1
                          }));
                        }
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                {formErrors.quantity && (
                  <span className="error-message">
                    <FiAlertCircle /> {formErrors.quantity}
                  </span>
                )}
              </div>

              {/* Price Summary */}
              <div className="price-summary">
                <div className="price-row">
                  <span>Candle Price:</span>
                  <span>₹{selectedCandle?.price || 0}</span>
                </div>
                <div className="price-row">
                  <span>Quantity:</span>
                  <span>× {formData.quantity}</span>
                </div>
                <div className="price-divider"></div>
                <div className="price-row total">
                  <span>Total Amount:</span>
                  <span>₹{calculateTotal()}</span>
                </div>
                <div className="price-note">
                  <FiTruck /> Free delivery on all orders!
                </div>
              </div>

              {/* Special Instructions */}
              <div className="form-group">
                <label htmlFor="specialInstructions" className="form-label">
                  Special Instructions <span className="optional">(Optional)</span>
                </label>
                <textarea
                  id="specialInstructions"
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  placeholder="Any special requests? (e.g., gift wrapping, delivery time)"
                  className="form-textarea"
                  rows="3"
                />
              </div>

              {/* Payment Method */}
              <div className="form-group">
                <label className="form-label">
                  Payment Method <span className="required">*</span>
                </label>
                <div className="payment-options">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                    />
                    <div className="payment-option-content">
                      <FiCreditCard />
                      <span>Cash on Delivery</span>
                    </div>
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={formData.paymentMethod === 'online'}
                      onChange={handleChange}
                      disabled
                    />
                    <div className="payment-option-content">
                      <FiLock />
                      <span>Online Payment</span>
                      <span className="coming-soon">(Coming Soon)</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* ===== SUBMIT BUTTON ===== */}
          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="spinner" />
                  Placing Order...
                </>
              ) : (
                <>
                  <FiCheckCircle />
                  Place Order
                </>
              )}
            </button>
            <p className="form-note">
              <FiLock className="lock-icon" />
              Your information is secure and will not be shared with third parties.
            </p>
          </div>
        </form>
      </div>

      {/* ===== STYLES ===== */}
      <style jsx>{`
        /* ===== FORM WRAPPER ===== */
        .order-form-wrapper {
          min-height: 100vh;
          padding: 6rem 2rem 4rem;
          background: linear-gradient(135deg, #FFF8F0 0%, #F7E8D7 100%);
        }

        .order-form-container {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          border-radius: 30px;
          padding: 3rem;
          box-shadow: 0 20px 60px rgba(44, 24, 16, 0.1);
        }

        /* ===== FORM HEADER ===== */
        .form-header {
          text-align: center;
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 2px solid #F0E6D8;
        }

        .form-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #2C1810;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .title-icon {
          color: #D4AF37;
          font-size: 2.5rem;
        }

        .form-subtitle {
          color: #8B7355;
          font-size: 1.1rem;
          margin-top: 0.5rem;
        }

        /* ===== FORM GRID ===== */
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }

        /* ===== SECTION HEADING ===== */
        .section-heading {
          font-size: 1.3rem;
          font-weight: 700;
          color: #2C1810;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #D4AF37;
        }

        .heading-icon {
          color: #D4AF37;
        }

        /* ===== FORM GROUP ===== */
        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: #2C1810;
          margin-bottom: 0.4rem;
        }

        .required {
          color: #FF4444;
        }

        .optional {
          color: #8B7355;
          font-weight: 400;
          font-size: 0.8rem;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          border: 2px solid #E8DDD0;
          border-radius: 12px;
          transition: all 0.3s ease;
          background: white;
        }

        .input-wrapper:focus-within {
          border-color: #D4AF37;
          box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.1);
        }

        .input-wrapper.error {
          border-color: #FF4444;
        }

        .input-wrapper.error:focus-within {
          box-shadow: 0 0 0 4px rgba(255, 68, 68, 0.1);
        }

        .input-icon {
          position: absolute;
          left: 14px;
          color: #8B7355;
          font-size: 1.1rem;
        }

        .form-input,
        .form-select {
          width: 100%;
          padding: 12px 14px 12px 44px;
          border: none;
          background: transparent;
          font-size: 1rem;
          color: #2C1810;
          outline: none;
        }

        .form-select {
          appearance: none;
          cursor: pointer;
        }

        .form-select option {
          padding: 10px;
        }

        .form-textarea {
          width: 100%;
          padding: 12px 14px;
          border: 2px solid #E8DDD0;
          border-radius: 12px;
          font-size: 1rem;
          color: #2C1810;
          outline: none;
          transition: all 0.3s ease;
          resize: vertical;
          font-family: inherit;
        }

        .form-textarea:focus {
          border-color: #D4AF37;
          box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.1);
        }

        /* ===== QUANTITY ===== */
        .quantity-input {
          padding-right: 140px;
        }

        .quantity-controls {
          position: absolute;
          right: 6px;
          display: flex;
          align-items: center;
          gap: 8px;
          background: #FFF8F0;
          border-radius: 8px;
          padding: 4px;
        }

        .qty-btn {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 6px;
          background: #E8DDD0;
          color: #2C1810;
          font-size: 1.2rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .qty-btn:hover {
          background: #D4AF37;
          color: white;
        }

        .qty-value {
          font-weight: 700;
          color: #2C1810;
          min-width: 24px;
          text-align: center;
        }

        /* ===== PINCODE LOADER ===== */
        .input-loader {
          position: absolute;
          right: 14px;
          color: #D4AF37;
          animation: spin 1s linear infinite;
        }

        .input-check {
          position: absolute;
          right: 14px;
          color: #4CAF50;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* ===== ERROR & SUCCESS MESSAGES ===== */
        .error-message {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #FF4444;
          font-size: 0.85rem;
          margin-top: 0.3rem;
        }

        .success-message {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #4CAF50;
          font-size: 0.85rem;
          margin-top: 0.3rem;
        }

        /* ===== FORM ROW ===== */
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        /* ===== PRICE SUMMARY ===== */
        .price-summary {
          background: #FFF8F0;
          padding: 1.5rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          padding: 0.3rem 0;
          color: #5A3D2E;
        }

        .price-row.total {
          font-size: 1.2rem;
          font-weight: 700;
          color: #2C1810;
        }

        .price-divider {
          border-top: 2px dashed #D4AF37;
          margin: 0.5rem 0;
        }

        .price-note {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #4CAF50;
          font-weight: 600;
          margin-top: 0.5rem;
          font-size: 0.9rem;
        }

        /* ===== PAYMENT OPTIONS ===== */
        .payment-options {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .payment-option {
          flex: 1;
          min-width: 150px;
          cursor: pointer;
        }

        .payment-option input[type="radio"] {
          display: none;
        }

        .payment-option-content {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border: 2px solid #E8DDD0;
          border-radius: 12px;
          transition: all 0.3s ease;
          background: white;
        }

        .payment-option input[type="radio"]:checked + .payment-option-content {
          border-color: #D4AF37;
          background: #FFF8F0;
          box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.1);
        }

        .payment-option-content:hover {
          border-color: #D4AF37;
        }

        .coming-soon {
          font-size: 0.7rem;
          color: #8B7355;
          background: #F0E6D8;
          padding: 2px 8px;
          border-radius: 10px;
        }

        /* ===== FORM ACTIONS ===== */
        .form-actions {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 2px solid #F0E6D8;
          text-align: center;
        }

        .submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 1rem 4rem;
          background: linear-gradient(135deg, #D4AF37 0%, #FF6B35 100%);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 1.2rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 250px;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .submit-btn .spinner {
          animation: spin 1s linear infinite;
        }

        .form-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 1rem;
          color: #8B7355;
          font-size: 0.9rem;
        }

        .lock-icon {
          color: #4CAF50;
        }

        /* ===== RESPONSIVE ===== */
        @media screen and (max-width: 1024px) {
          .order-form-container {
            padding: 2rem;
          }
        }

        @media screen and (max-width: 768px) {
          .order-form-wrapper {
            padding: 5rem 1rem 2rem;
          }

          .order-form-container {
            padding: 1.5rem;
          }

          .form-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .form-title {
            font-size: 2rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .submit-btn {
            width: 100%;
            padding: 1rem 2rem;
            min-width: auto;
          }

          .payment-options {
            flex-direction: column;
          }

          .payment-option {
            min-width: auto;
          }
        }

        @media screen and (max-width: 480px) {
          .order-form-container {
            padding: 1rem;
          }

          .form-title {
            font-size: 1.5rem;
          }

          .form-input,
          .form-select {
            font-size: 0.9rem;
            padding: 10px 12px 10px 38px;
          }

          .form-textarea {
            font-size: 0.9rem;
          }

          .quantity-controls {
            padding: 2px;
          }

          .qty-btn {
            width: 28px;
            height: 28px;
            font-size: 1rem;
          }

          .price-summary {
            padding: 1rem;
          }
        }

        /* ===== ANIMATIONS ===== */
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .form-group {
          animation: slideUp 0.4s ease forwards;
        }

        .form-group:nth-child(1) { animation-delay: 0.05s; }
        .form-group:nth-child(2) { animation-delay: 0.1s; }
        .form-group:nth-child(3) { animation-delay: 0.15s; }
        .form-group:nth-child(4) { animation-delay: 0.2s; }
        .form-group:nth-child(5) { animation-delay: 0.25s; }
        .form-group:nth-child(6) { animation-delay: 0.3s; }
        .form-group:nth-child(7) { animation-delay: 0.35s; }
        .form-group:nth-child(8) { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
};

export default OrderForm;
