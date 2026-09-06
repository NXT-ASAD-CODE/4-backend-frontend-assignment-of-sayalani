import React, { createContext, useContext, useState } from 'react'

const initialNotifications = [
  { id: 1, message: 'Your order has been shipped', read: false },
  { id: 2, message: 'New styles have been added', read: false },
  { id: 3, message: 'Your cart is waiting for you', read: false },
  { id: 4, message: 'Welcome to SHOP.CO', read: true },
  { id: 5, message: 'Your profile was updated', read: true },
]

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(initialNotifications)

  const addNotification = (message) => {
    setNotifications((currentNotifications) => [
      {
        id: Date.now(),
        message,
        read: false,
      },
      ...currentNotifications,
    ])
  }

  const markAsRead = (notificationId) => {
    setNotifications((currentNotifications) => currentNotifications.map((notification) => (
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    )))
  }

  const removeNotification = (notificationId) => {
    setNotifications((currentNotifications) => currentNotifications.filter(
      (notification) => notification.id !== notificationId
    ))
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) throw new Error('useNotifications must be used within NotificationProvider')
  return context
}
