"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { jsPDF } from "jspdf";
import { url } from "inspector";
interface resumeFormData {
  image: FileList | null;
  fullName: string;
  email: string;
  phoneNumber: number;
  education: string;
  skills: string;
  experience: string;
}

const ResumeBuilder: React.FC = () => {
  const { register, handleSubmit } = useForm<resumeFormData>();
  const [resumeData, setResumeData] = useState<resumeFormData | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const onSubmit: SubmitHandler<resumeFormData> = (data) => {
    setResumeData(data);
  }
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;


    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setImagePreview(imageUrl);
    }
  }
  const handleDownloadPDF = () => {
    if (!resumeData) return
    const doc = new jsPDF();
    if (imagePreview) {
      doc.addImage(imagePreview, 'JPEG', 20, 20, 40, 40);
    }

    doc.text(`${resumeData.fullName}`, 20, 80);
    doc.text(`${resumeData.email}`, 20, 90);
    doc.text(`${resumeData.phoneNumber}`, 20, 100);
    doc.text(`${resumeData.education}`, 20, 110);
    doc.text(`${resumeData.skills}`, 20, 120);
    doc.text(`${resumeData.experience}`, 20, 130);
    doc.save('resume.pdf')
  };
  return (
    <main className="max-w-screen-lg mx-auto">

      <div className="relative w-full h-[250vh] bg-fixed bg-cover bg-center pt-5"
        style={{ backgroundImage: 'url(/tea.jpeg)' }}
      >

        <div className="relative max-w-4xl mx-auto shadow-lg rounded-lg bg-[rgb(0,0,0,0.5)] p-10 items-center py-4">
          <h1 className="text-4xl text-[#b7dd2e] font-bold mt-10 text-center">Resume Builder</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
            <div>
              <label className="block text-[#cefa31]">Full Name</label>
              <input type="text"
                {...register('fullName')}
                placeholder="Enter Your name"
                required
                className="mt-1 p-2 w-full rounded-md focus:outline-none bg-transparent border-[1px] text-white"
              />
            </div>
            <div>
              <label className="block text-[#cefa31]">Email Address</label>
              <input type="text"
                {...register('email')}
                placeholder="Enter Your Email Address"
                required
                className="mt-1 p-2 w-full rounded-md focus:outline-none bg-transparent border-[1px] text-white"
              />
            </div>
            <div>
              <label className="block text-[#cefa31]">Mobile Number</label>
              <input type="text"
                {...register('phoneNumber')}
                placeholder="Enter Your phone number"
                required
                className="mt-1 p-2 w-full rounded-md focus:outline-none bg-transparent border-[1px] text-white"
              />
            </div>
            <div>
              <label className="block text-[#cefa31]">Education
              </label>
              <textarea
                {...register('education')}
                placeholder="Your education"
                required
                className="mt-1 p-2 w-full rounded-md focus:outline-none bg-transparent border-[1px] text-white "
              />
            </div>
            <div>
              <label className="block text-[#cefa31]">Skills</label>
              <textarea
                {...register('skills')}
                placeholder="Your Skills"
                required
                className="mt-1 p-2 w-full rounded-md focus:outline-none bg-transparent border-[1px] text-white "
              />
            </div>

            <div>
              <label className="block text-[#cefa31]">Experience</label>
              <textarea
                {...register('experience')}
                placeholder="Your experience"
                required
                className="mt-1 p-2 w-full rounded-md focus:outline-none bg-transparent border-[1px] text-white "
              />
            </div>
            <div>
              <label className="block text-[#cefa31]">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                width={100}
                height={100}
                required
                className="mt-1 p-2 w-full rounded-md focus:outline-none bg-transparent border-[1px] text-white object-cover"
              />
            </div>
            <button type="submit" className="hover:border bg-[#a8cc25] rounded-[0.6rem] px-3 py-2 hover:bg-transparent  text-black hover:text-white">Submit Now</button>
          </form>
        </div>
        <div className="relative max-w-4xl mx-auto shadow-lg rounded-lg bg-[rgb(0,0,0,0.5)] p-10 items-center mt-5">
          {resumeData && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-white text-center">Your Resume</h2>
              {imagePreview && (
                <div className="mb-4 flex justify-center items-center">
                  <Image
                    src={imagePreview}
                    alt="Profile Preview"
                    width={100} height={100}

                    className=" rounded-full object-cover border-2 border-[#cefa31] "
                  />
                </div>
              )}
              <div className="items-center text-[#cefa31] text-center">
                <h3 className="text-xl font-bold text-white">{resumeData.fullName}</h3>
                <p> {resumeData.email}</p>
                <p> {resumeData.phoneNumber}</p>
                <p> {resumeData.education}</p>
                <p> {resumeData.skills}</p>
                <p> {resumeData.experience}</p>
              </div>
              <div className="flex justify-center items-center">
                <button
                  onClick={handleDownloadPDF}
                  className="mt-4 bg-[#a9ce23] text-black hover:text-white py-2 rounded-md hover:bg-transparent hover:border-[1px] px-4 "
                >
                  Download as PDF
                </button>

              </div>

            </div>
          )}
        </div>
      </div>

    </main>
  );
}
export default ResumeBuilder;