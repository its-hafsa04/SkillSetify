"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/header";
import { exportToPDF } from "../utils/exportToPDF";
import Image from "next/image";

const CreateResume = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [resumeData, setResumeData] = useState({
    fullName: "",
    contact: "",
    phone: "",
    // Add other fields as necessary
  });

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);

    // Initialize form fields with template data if it exists
    if (template.fields) {
      setResumeData(template.fields);
    } else {
      setResumeData({
        fullName: "",
        contact: "",
        phone: "",
        // Add other default values as needed
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleExportPDF = () => {
    exportToPDF(resumeData);
  };

  return (
      
    <div className="flex-grow text-gray-900 p-4 md:p-6"
    style={{
      backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvCl6FOpABsqFizsBhPoz_7Y9DNJKoSWb-CQ&s')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed", 
      backgroundPosition: "center",
      height: '100vh'
    }}>
    <Header />
    <div className="flex flex-col lg:flex-row lg:px-9 gap-5 pt-2">
      <Sidebar
        onTemplateSelect={handleTemplateSelect}
        selectedTemplate={selectedTemplate}
      />
      
      <div className="flex-grow flex flex-col text-center justify-center px-4 lg:px-0">
        <h1 className="text-2xl md:text-3xl text-center font-semibold mt-4 mb-4">
          Create Your Resume
        </h1>
  
        {selectedTemplate ? (
          <>
            <form className="space-y-4">
              <div className="flex flex-col mb-4 text-left">
                <label htmlFor="fullName" className="text-lg font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={resumeData.fullName || ""}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="flex flex-col mb-4 text-left">
                <label htmlFor="contact" className="text-lg font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="contact"
                  name="contact"
                  value={resumeData.contact || ""}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="flex flex-col mb-4 text-left">
                <label htmlFor="phone" className="text-lg font-medium">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={resumeData.phone || ""}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
              </div>
            </form>
  
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2 text-left">Preview</h2>
              <div className="border p-4 bg-white shadow-md rounded-lg">
                <Image
                  src={selectedTemplate.image}
                  alt={selectedTemplate.name}
                  className="w-full h-auto object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-700">
                  {selectedTemplate.name}
                </h3>
                <p className="text-sm text-gray-500 text-left">
                  Name: {resumeData?.fullName || "N/A"}
                  <br />
                  Email: {resumeData?.contact || "N/A"}
                  <br />
                  Phone: {resumeData?.phone || "N/A"}
                </p>
              </div>
            </div>
  
            <button
              type="button"
              onClick={handleExportPDF}
              className="mt-6 p-2 bg-green-500 text-white rounded-md hover:bg-green-600 w-[150px]"
            >
              Export as PDF
            </button>
          </>
        ) : (
          <p className="text-gray-500 text-center mt-6">
            Please select a template to start creating your resume.
          </p>
        )}
      </div>
    </div>
  </div>

  );
};

export default CreateResume;
