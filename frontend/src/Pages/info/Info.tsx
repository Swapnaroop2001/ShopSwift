export default function Info() {
    return (
      <div className="p-6 max-w-4xl mx-auto text-left mt-16">
        {/* Main Title Card */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold mb-4">ShopSwift Marketplace App</h1>
        </div>
  
        {/* Purpose Section Card */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-2">Purpose</h2>
          <p className="text-gray-700">
            ShopSwift is designed to revolutionize online shopping by providing a fast, secure, and scalable marketplace that connects buyers and sellers. Its core purpose is to:
            <ul className="list-disc ml-6 mt-2">
              <li>Empower sellers with tools to manage products, track orders, and process payments effortlessly.</li>
              <li>Offer buyers a modern, responsive platform to browse, purchase, and review products with ease.</li>
              <li>Ensure trust and efficiency through secure authentication, real-time order tracking, and a robust microservices architecture.</li>
            </ul>
            ShopSwift aims to be the go-to marketplace for small vendors and individual entrepreneurs while delivering a seamless experience for customers worldwide.
          </p>
        </div>
  
        {/* How It’s Made Section Card */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-2">How It’s Made</h2>
          <p className="text-gray-700">
            ShopSwift is built with a cutting-edge tech stack and a microservices-based architecture to ensure scalability, modularity, and performance. Here’s how it comes together:
          </p>
  
          {/* Tech Stack Breakdown Card */}
          <div className="bg-gray-50 shadow-inner rounded-lg p-4 mt-4">
            <h3 className="text-xl font-medium mb-2">Tech Stack Breakdown</h3>
            <ul className="list-disc ml-6 text-gray-700">
              <li>
                <strong>Frontend:</strong> React.js, Redux, TailwindCSS
                <ul className="list-circle ml-6">
                  <li>React.js powers interactive UIs for product listings, search, and user profiles.</li>
                  <li>Redux manages global state (cart, orders, authentication).</li>
                  <li>TailwindCSS delivers a responsive, modern design with utility-first styling.</li>
                </ul>
              </li>
              <li>
                <strong>Backend:</strong> Java, Spring Boot (Microservices)
                <ul className="list-circle ml-6">
                  <li>Spring Boot handles business logic across independent microservices:</li>
                  <li>Auth Service (Port 8081): User registration, login, and role-based access.</li>
                  <li>Product Service (Port 8082): Product listings, inventory, and pricing.</li>
                  <li>Order Service (Port 8083): Order processing and shipping tracking.</li>
                  <li>Payment Service (Port 8084): Payment transactions via gateways like Stripe.</li>
                  <li>Chat Service (Port 8085): Real-time buyer-seller communication.</li>
                  <li>User Service (Port 8086): User profile management.</li>
                </ul>
              </li>
              <li>
                <strong>Database:</strong> PostgreSQL
                <ul className="list-circle ml-6">
                  <li>Stores structured data for users, products, orders, and reviews with relational integrity.</li>
                </ul>
              </li>
              <li>
                <strong>Authentication:</strong> Firebase Auth
                <ul className="list-circle ml-6">
                  <li>Secure login/signup with social options (Google, Facebook) and role-based access control.</li>
                </ul>
              </li>
              <li>
                <strong>APIs:</strong> RESTful APIs
                <ul className="list-circle ml-6">
                  <li>Built with Spring Boot to enable frontend-backend communication.</li>
                </ul>
              </li>
              <li>
                <strong>Serverless:</strong> AWS Lambda
                <ul className="list-circle ml-6">
                  <li>Handles background tasks like email notifications and inventory updates.</li>
                </ul>
              </li>
              <li>
                <strong>Deployment & DevOps:</strong> Docker, AWS EC2, GitHub Actions
                <ul className="list-circle ml-6">
                  <li>Docker containerizes services for consistent deployment.</li>
                  <li>AWS EC2 hosts microservices; AWS RDS manages PostgreSQL.</li>
                  <li>GitHub Actions automates CI/CD pipelines for testing and deployment.</li>
                </ul>
              </li>
              <li>
                <strong>Cloud Storage:</strong> AWS S3
                <ul className="list-circle ml-6">
                  <li>Stores product images and user assets for scalability.</li>
                </ul>
              </li>
            </ul>
          </div>
  
          {/* How It Fits Together Card */}
          <div className="bg-gray-50 shadow-inner rounded-lg p-4 mt-4">
            <h3 className="text-xl font-medium mb-2">How It Fits Together</h3>
            <p className="text-gray-700">
              The React frontend, styled with TailwindCSS and powered by Redux, provides a dynamic user interface. It communicates with Spring Boot microservices via RESTful APIs. Each microservice (e.g., Product, Order, Payment) runs independently on designated ports (8081-8086), orchestrated by a Discovery Server (Eureka, Port 8761) and configured via a Config Server (Port 8888). Firebase Auth secures user access, while PostgreSQL on AWS RDS stores data. AWS Lambda handles asynchronous tasks, and AWS S3 manages media. Docker and GitHub Actions streamline deployment to AWS EC2, ensuring a robust, scalable marketplace.
            </p>
          </div>
        </div>
      </div>
    );
  }