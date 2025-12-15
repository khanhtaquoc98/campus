import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "@/components/layout/Layout"
import { HomePage } from "@/pages/HomePage"
import { LoginPage } from "@/pages/LoginPage"
import { AdmissionPage } from "@/pages/AdmissionPage"
import { ContactPage } from "@/pages/ContactPage"
import { AboutPage } from "@/pages/AboutPage"
import { ApplicantProfilePage } from "@/pages/ApplicantProfilePage"
import { CheckStatusPage } from "@/pages/CheckStatusPage"

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
        <Route path="/profile/:id" element={<ApplicantProfilePage />} />
        <Route path="/check-status" element={<CheckStatusPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
