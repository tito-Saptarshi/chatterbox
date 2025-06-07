"use client";

import type React from "react";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Shuffle, User } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { onboarding } from "../actions/user.actions";

export default function OnboardingPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    bio: "",
    location: "",
    profilePicture: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (prevState: any, formData: FormData) => {
    try {
      const result = await onboarding(prevState, formData);

      console.log("result ", result);

      if (result.status == "SUCCESS") {
        toast("Onboarding completed");
        router.push(`/`);
      }

      return result;
    } catch (error) {
      toast("An unexpected error has occurred");

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleSubmit, {
    error: "",
    status: "INITIAL",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generateProfilePicture = async () => {
    setIsGenerating(true);
    const randomIdx = Math.floor(Math.random() * 100) + 1;
    const avatarUrl = `https://avatar.iran.liara.run/public/${randomIdx}.png`;

    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        profilePicture: avatarUrl,
      }));
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            Welcome! Let&apos;s get you set up
          </CardTitle>
          <CardDescription className="text-lg">
            Tell us a bit about yourself to personalize your experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage
                    src={formData.profilePicture || "/placeholder.svg"}
                    alt="Profile picture"
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gray-100 text-gray-400">
                    <User className="w-12 h-12" />
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex gap-3">
                <div className="relative">
                  <input
                    name="profilePicture"
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="file-upload"
                    disabled
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-2"
                    disabled
                  >
                    <Upload className="w-4 h-4" />
                    Upload Photo
                  </Button>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={generateProfilePicture}
                  disabled={isGenerating}
                  className="flex items-center gap-2"
                >
                  <Shuffle className="w-4 h-4" />
                  {isGenerating ? "Generating..." : "Generate Picture"}
                </Button>
              </div>
            </div>

            {/* Hidden input to send profilePic */}
            <input
              type="hidden"
              name="profilePic"
              value={formData.profilePicture}
            />

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="@johndoe"
                  value={formData.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="San Francisco, CA"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell us about yourself..."
                className="min-h-[100px] resize-none"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                {formData.bio.length}/160 characters
              </p>
            </div>

            {/* Show error if any */}
            {/* {state.error && (
              <p className="text-center text-red-500 text-sm mt-2">
                {state.error}
              </p>
            )} */}

            {state.error && toast(state.error)}

            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                className="startup-form_btn text-white"
                disabled={isPending}
              >
                {isPending ? "Redirecting..." : " Complete Setup"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
