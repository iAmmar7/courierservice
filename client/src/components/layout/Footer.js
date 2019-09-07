import React from 'react'

export default function Footer() {
  return (
    <footer className="secondary bg-dark text-white mt-5 p-4 text-center">
      <p>Copyright &copy; {new Date().getFullYear()} CourierService || Find me on <a className="text-secondary" style={{ textDecoration: 'underline' }} href="https://github.com/iammar7">GitHub</a></p>
    </footer>
  )
}
