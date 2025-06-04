"use client";

import { useState } from "react";
import {
  Search,
  Bell,
  Send,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CurrentUser } from "@/lib/types";




interface NavbarProps {
  currentPage: "friends" | "sent" | "received" | "edit";
  onPageChange: (page: "friends" | "sent" | "received" | "edit") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onLogout: () => void;
  notificationCount: number;
  currentUser: CurrentUser;
}

const onLogout = () => {
  console.log("Logging out...");
  // Implement logout logic here
};



export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [currentPage, setCurrentPage] = useState<
    "friends" | "sent" | "received" | "edit"
  >("friends");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    id: "current-user",
    name: "John Doe",
    username: "johndoe",
    bio: "Love connecting with new people and exploring new technologies!",
    avatar: "/placeholder.svg?height=80&width=80",
  });

  const handleUpdateProfile = (updatedUser: CurrentUser) => {
  setCurrentUser(updatedUser);
  console.log("Profile updated:", updatedUser);
};

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Toggle dark class on document element
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">Chatterbox</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-2xl mx-8">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={() => {}}
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant={currentPage === "friends" ? "default" : "ghost"}
              onClick={() => {}}
              size="sm"
            >
              Friends
            </Button>

            <Button
              variant={currentPage === "sent" ? "default" : "ghost"}
              onClick={() => {}}
              size="sm"
              className="relative"
            >
              <Send className="h-4 w-4 mr-2" />
              Sent
            </Button>

            <Button
              variant={currentPage === "received" ? "default" : "ghost"}
              onClick={() => {}}
              size="sm"
              className="relative"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              {10 > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {10}
                </Badge>
              )}
            </Button>

            <Button
              variant={currentPage === "edit" ? "default" : "ghost"}
              onClick={() => {}}
              size="sm"
            >
              <Avatar className="h-5 w-5 mr-2">
                <AvatarImage
                  src={currentUser.avatar || "/placeholder.svg"}
                  alt={currentUser.name}
                />
                <AvatarFallback className="text-xs">
                  {currentUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              Profile
            </Button>

            <Button
              variant="ghost"
              onClick={toggleDarkMode}
              size="sm"
              className="relative"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>


            <Button
              variant="ghost"
              onClick={onLogout}
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={() => {}}
              className="pl-10 w-full"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Button
              variant={currentPage === "friends" ? "default" : "ghost"}
              onClick={() => {}}
              className="w-full justify-start"
            >
              Friends
            </Button>

            <Button
              variant={currentPage === "sent" ? "default" : "ghost"}
              onClick={() => {}}
              className="w-full justify-start relative"
            >
              <Send className="h-4 w-4 mr-2" />
              Sent Requests
            </Button>

            <Button
              variant={currentPage === "received" ? "default" : "ghost"}
              onClick={() => {}}
              className="w-full justify-start relative"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              {10 > 0 && (
                <Badge className="ml-auto h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {10}
                </Badge>
              )}
            </Button>

            <Button
              variant={currentPage === "edit" ? "default" : "ghost"}
              onClick={() => {}}
              className="w-full justify-start"
            >
              <User className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>

            <Button
              variant="ghost"
              onClick={() => {
                toggleDarkMode();
                setIsMobileMenuOpen(false);
              }}
              className="w-full justify-start"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4 mr-2" />
              ) : (
                <Moon className="h-4 w-4 mr-2" />
              )}
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </Button>

            <Button
              variant="ghost"
              onClick={onLogout}
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
