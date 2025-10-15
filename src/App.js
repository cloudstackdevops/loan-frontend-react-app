import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://54.91.21.73:3000/api/v1/loans"; // 👈 replace with your EC2 backend IP

function App() {
  const [loans, setLoans] = useState([]);
  const [form, setForm] = useState({
    borrower_name: "",
    amount: "",
    term: "",
    interest_rate: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch loans
  const fetchLoans = async () => {
    try {
      const res = await axios.get(API_BASE);
      setLoans(res.data);
    } catch (err) {
      console.error("Error fetching loans:", err);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create loan
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_BASE, { loan: form });
      setForm({ borrower_name: "", amount: "", term: "", interest_rate: "" });
      fetchLoans();
    } catch (err) {
      alert("Error creating loan");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto", fontFamily: "Arial" }}>
      <h2 style={{ textAlign: "center" }}>💰 Loan Management</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          name="borrower_name"
          placeholder="Borrower Name"
          value={form.borrower_name}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="number"
          name="term"
          placeholder="Term (months)"
          value={form.term}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="number"
          name="interest_rate"
          placeholder="Interest Rate (%)"
          value={form.interest_rate}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Creating..." : "Create Loan"}
        </button>
      </form>

      <h3>Existing Loans</h3>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #ddd",
        }}
      >
        <thead>
          <tr style={{ background: "#f8f8f8" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Amount</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Term</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Rate</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {loan.borrower_name}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {loan.amount}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {loan.term}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {loan.interest_rate}%
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {loan.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

