import { useState } from 'react'
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react'

const categories = [
  "New", "Women", "Men", "Kids", "Home", "Beauty", "Electronics", "Sports", "Toys"
]

const products = [
  { id: 1, name: "Wireless Earbuds", price: 19.99, image: "/placeholder.svg?height=200&width=200" },
  { id: 2, name: "Smart Watch", price: 39.99, image: "/placeholder.svg?height=200&width=200" },
  { id: 3, name: "Phone Case", price: 9.99, image: "/placeholder.svg?height=200&width=200" },
  { id: 4, name: "Portable Charger", price: 24.99, image: "/placeholder.svg?height=200&width=200" },
  { id: 5, name: "Bluetooth Speaker", price: 29.99, image: "/placeholder.svg?height=200&width=200" },
  { id: 6, name: "Fitness Tracker", price: 34.99, image: "/placeholder.svg?height=200&width=200" },
]

function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically handle the login logic
    console.log('Login attempted with:', email, password)
    // For now, we'll just close the modal
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Login</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-800" href="#">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Component() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-500 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Menu className="mr-2 h-6 w-6" />
            <h1 className="text-2xl font-bold">Temu</h1>
          </div>
          <div className="flex-grow mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for items"
                className="w-full p-2 rounded-full text-gray-900 pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            </div>
          </div>
          <div className="flex items-center">
            <ShoppingCart className="mr-4 h-6 w-6" />
            <button onClick={() => setIsLoginOpen(true)} className="flex items-center">
              <User className="h-6 w-6" />
              <span className="ml-2">Login</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="flex overflow-x-auto space-x-4 pb-2">
            {categories.map((category, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-white rounded-full shadow whitespace-nowrap hover:bg-red-100 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Featured Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-red-500 font-bold">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  )
}
