import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "@/components/layout/Layout"
import { HomePage } from "@/pages/HomePage"
import { LoginPage } from "@/pages/LoginPage"
import { AdmissionPage } from "@/pages/AdmissionPage"
import { ContactPage } from "@/pages/ContactPage"
import { AboutPage } from "@/pages/AboutPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admission" element={<AdmissionPage />} />
        <Route
          path="/contact"
          element={
            <Layout>
              <ContactPage />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <AboutPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
