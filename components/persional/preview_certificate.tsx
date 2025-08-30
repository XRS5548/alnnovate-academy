"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function CertificatePreviewForm() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [certificate, setCertificate] = useState("Completed in Data Science");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!name.trim()) return;
        router.push(`/demo-certificate/view?text=${encodeURIComponent(certificate)}&name=${encodeURIComponent(name)}`);
    }

    return (
        <>
            <h1 className="text-center text-3xl">Certificate <span className="text-primary">Preview</span></h1>
            <main className=" flex items-center justify-center p-6">
                <div className="grid md:grid-cols-2 gap-6 w-full max-w-5xl">
                    {/* Left side: Certificate sample */}
                    <Card className="overflow-hidden shadow-lg">
                        <CardHeader>
                            <CardTitle>Certificate Preview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative aspect-video ">

                                <Image src={'/certificate.png'} alt="Certificate Demo" fill />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right side: Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Generate Your Demo Certificate</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Your Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="certificate">Select Certificate</Label>
                                    <Select value={certificate} onValueChange={setCertificate}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Choose certificate type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Completed in Data Science">Completed in Data Science</SelectItem>
                                            <SelectItem value="Completed in Machine Learning">Completed in Machine Learning</SelectItem>
                                            <SelectItem value="Completed in Python Programming">Completed in Python Programming</SelectItem>
                                            <SelectItem value="Completed in Deep Learning">Completed in Deep Learning</SelectItem>
                                            <SelectItem value="Completed in Artificial Intelligence">Completed in Artificial Intelligence</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button type="submit" className="w-full">
                                    Preview Certificate
                                </Button>
                                 <Button type="submit" variant={'secondary'} onClick={()=>router.push('/demo-certificate')} className="w-full">
                                    More
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>

    );
}
