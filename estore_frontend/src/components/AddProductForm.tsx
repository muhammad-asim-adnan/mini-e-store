import React, { useState, FormEvent } from 'react';
import { addProduct } from '../api/product';
import { useAuth } from '../api/useAuth';

type FormState = {
  name: string;
  price: string;
  category: string;
  stock_status: string;
};

interface Props {
  onProductAdded: () => void;
}

const AddProductForm = ({ onProductAdded }: Props) => {
  const [form, setForm] = useState<FormState>({ name: '', price: '', category: '', stock_status: 'In Stock' });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const {logout, user} = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const priceNumber = Number(form.price);
    if (!form.name || priceNumber <= 0 || !form.category || !form.stock_status) {
      alert('Please fill in all fields before submitting.');
      return;
    }
    setLoading(true);
    await addProduct({ ...form, price: priceNumber });
    setForm({ name: '', price: '', category: '', stock_status: 'In Stock' });
    onProductAdded();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3 shadow-lg p-4 border-1 rounded">
        <h4 className="mb-0">Welcome {user?.name}</h4>
        <div>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addProductModal"
        >
          Add
        </button>
        &nbsp;&nbsp;
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
        </div>
       
      </div>

     

      <div
        className="modal fade"
        id="addProductModal"
        tabIndex={-1}
        aria-labelledby="addProductModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-slideout">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="addProductModalLabel">
                Add Product
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {success && (
        <div className="alert alert-success mt-2" role="alert">
          Product added.
        </div>
      )}
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter product name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter price"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter category"
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Stock Status</label>
                  <select
                    className="form-select"
                    value={form.stock_status}
                    onChange={e =>
                      setForm({ ...form, stock_status: e.target.value })
                    }
                  >
                    <option>In Stock</option>
                    <option>Out of Stock</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  ) : (
                    'Save Product'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .modal-dialog-slideout {
          position: fixed;
          right: 0;
          margin: 0;
          height: 100%;
          display: flex;
          align-items: center;
          transform: translateX(-100%);
          transition: transform 0.3s ease-out;
        }
        .modal.fade.show .modal-dialog-slideout {
          transform: translateY(0);
          width: inherit;
          
        }
        .modal-content {
          height: 100vh;
          border-radius: 0;
        }
          .modal{
          backdrop-filter: blur(2px);
          }
          .modal-header{
          border-radius: 0;
          }
      `}</style>
    </div>
  );
};

export default AddProductForm;