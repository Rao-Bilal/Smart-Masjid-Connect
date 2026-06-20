import { useState } from 'react';

const ReportFoundForm = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    location: '',
    contactInfo: ''
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // We must use FormData to package the text and the file together
    const submitData = new FormData();
    submitData.append('itemName', formData.itemName);
    submitData.append('description', formData.description);
    submitData.append('location', formData.location);
    submitData.append('contactInfo', formData.contactInfo);
    if (image) {
      submitData.append('image', image); // The name 'image' matches upload.single('image') in Express
    }

    try {
      const response = await fetch('http://localhost:5000/api/lostfound/report-found', {
        method: 'POST',
        // Note: Do NOT set Content-Type header manually when using FormData. The browser handles the multipart boundaries automatically.
        body: submitData
      });

      if (response.ok) {
        setMessage('Item successfully added to the database.');
        setFormData({ itemName: '', description: '', location: '', contactInfo: '' });
        setImage(null);
        document.getElementById('imageInput').value = ""; // Clear file input
      } else {
        setMessage('Failed to add item.');
      }
    } catch (error) {
      console.error('Error reporting found item:', error);
      setMessage('Server error.');
    }
  };

  return (
    <div className="max-w-lg bg-white p-6 rounded-lg shadow-md border-t-4 border-green-600">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Admin: Log Found Item</h2>
      {message && <p className="mb-4 text-green-600 font-semibold">{message}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Item Name</label>
          <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-gray-700">Location Found</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-gray-700">Admin/Masjid Contact</label>
          <input type="text" name="contactInfo" value={formData.contactInfo} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-gray-700">Upload Image</label>
          <input type="file" id="imageInput" name="image" accept="image/*" onChange={handleFileChange} className="w-full px-4 py-2 border rounded-md" />
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
          Log Item
        </button>
      </form>
    </div>
  );
};

export default ReportFoundForm;