import './styles/admin.css';
import './styles/animations.css';
import './styles/auth.css';
import './styles/games.css';
import './styles/globals.css';
import './styles/header.css';
import './styles/modals.css';
import './styles/reviews.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage } from './components/pages/LoginPage'
import { SignUpPage } from './components/pages/SignUpPage'
import { HomePage } from './components/pages/HomePage'
import { AccountDetailsPage } from './components/pages/AccountDetailsPage'
import { MyReviewsPage } from './components/pages/MyReviewsPage'
import { AllReviewsPage } from './components/pages/AllReviewsPage'
import { Toaster } from 'react-hot-toast'
import { AddNewGamePage } from './components/pages/AddNewGamePage'
import { ManageUsersPage } from './components/pages/ManageUsersPage'

export default function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/account" element={<AccountDetailsPage />}></Route>
        <Route path="/my-reviews" element={<MyReviewsPage />}></Route>
        <Route path="/all-reviews" element={<AllReviewsPage />}></Route>
        <Route path="/add-new-game" element={<AddNewGamePage />}></Route>
        <Route path="/manage-users" element={<ManageUsersPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}