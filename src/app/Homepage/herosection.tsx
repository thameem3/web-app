import Image from "next/image";
import Button from "@/app/components/button";


const HeroSection = () => {
  return (
    <>
    <section className="bg-orange-50 py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            Don’t Waste Food. Share It with Someone in Need
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Join our mission to reduce food waste and fight hunger by donating excess food to those in need.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <Button label="Register" href="/register" />
            <Button label="Login" href="/login" variant="outlined" color="secondary" />
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/hero1.png"
            alt="Donate Food"
            width={500}
            height={400}
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>
      
    </section>
    <section className="bg-gray-50 py-16 px-4">
     <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-4xl font-bold text-blue-700 mb-4">
      Join Our Mission
    </h2>
    <p className="text-gray-600 mb-6 text-lg">
      We bridge the gap between food donors and NGOs.
    </p>
    <div className="flex flex-col md:flex-row justify-center gap-4">
      <Button label="Become a Donor" href="/register" />
      <Button label="Join as NGO" href="/register" variant="outlined" color="secondary" />
    </div>
    </div>
</section>
<section className="bg-gradient-to-br from-yellow-300 via-orange-200 to-pink-100 py-16 px-6">
  <div className="max-w-7xl mx-auto text-center">
    <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
      Who Can Join Us?
    </h2>
    <p className="text-lg text-gray-700 mb-10">
      Everyone has a role to play in fighting hunger.
    </p>

    <div className="grid gap-6 md:grid-cols-3">
      <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
        <h3 className="text-xl font-bold mb-2 text-gray-600">Individuals</h3>
        <p className="text-gray-600">Anyone can donate home-cooked food and be part of our mission.</p>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
        <h3 className="text-xl font-bold mb-2 text-gray-600">NGOs</h3>
        <p className="text-gray-600">Work with us to deliver food to the right people at the right time.</p>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
        <h3 className="text-xl font-bold mb-2 text-gray-600">Restaurants</h3>
        <p className="text-gray-600">Share surplus meals and reduce food waste.</p>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
        <h3 className="text-xl font-bold mb-2 text-gray-600">Event Managers</h3>
        <p className="text-gray-600">Donate leftover food from large gatherings like weddings.</p>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
        <h3 className="text-xl font-bold mb-2 text-gray-600">Volunteers</h3>
        <p className="text-gray-600">Join hands to pick up and deliver food with care.</p>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
        <h3 className="text-xl font-bold mb-2 text-gray-600">Corporates</h3>
        <p className="text-gray-600">Support through CSR by partnering with regular donations.</p>
      </div>
    </div>
  </div>
</section>

<section id="contact" className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-16 px-4">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">

    <div className="space-y-6">
      <h2 className="text-4xl font-bold">Contact Us</h2>
      <p className="text-gray-200">
        Not sure what you need? The team at Square Events will be happy to listen to you and suggest event ideas you hadn't considered.
      </p>

      <div className="mt-8 space-y-4 text-gray-100">
        <p className="flex items-center gap-2">
          <span>info@squareevents.com</span>
        </p>
        <p className="flex items-center gap-2">
          <span>Support: (+91) 123 456 586</span>
        </p>
      </div>
    </div>

    <div className="bg-white rounded-xl p-8 shadow-md text-gray-900">
      <h3 className="text-2xl font-semibold mb-2">We’d love to hear from you!</h3>
      <p className="mb-6 text-gray-600">Let’s get in touch</p>

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Full Name" className="border rounded-md px-4 py-2 w-full" />
          <input type="text" placeholder="Company" className="border rounded-md px-4 py-2 w-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="email" placeholder="Email" className="border rounded-md px-4 py-2 w-full" />
          <div className="flex gap-2">
            <select className="border rounded-md px-2 py-2">
              <option>IN</option>
            </select>
            <input type="text" placeholder="+1 (555) 000-0000" className="border rounded-md px-4 py-2 w-full" />
          </div>
        </div>

        <input type="text" placeholder="Address" className="border rounded-md px-4 py-2 w-full" />
        <textarea placeholder="Type your message here" className="border rounded-md px-4 py-2 w-full h-32" />

        <button
          type="submit"
          className="bg-purple-900 text-white px-6 py-3 rounded-md hover:bg-purple-800 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  </div>
</section>            
</>
  );
};

export default HeroSection;
