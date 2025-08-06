import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 text-center md:text-left">
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/donate">Donate</Link></li>
            <li><Link href="/register">Join Us</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <p className="mb-1">Email: support@foodbridge.org</p>
          <p>Phone: +91 98765 43210</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">FoodBridge</h3>
          <p className="text-sm text-gray-400">
            Help us feed the needy. Donate and Join Us to make a difference.
          </p>
        </div>
      </div>
      <p className="text-center mt-8 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} FoodBridge. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
