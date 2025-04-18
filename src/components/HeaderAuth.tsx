"use client"
import * as actions from "@/actions"
import {useSession} from "next-auth/react";
import React from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import { NavigationMenuItem } from "./ui/navigation-menu";

export default function HeaderAuth() {
    const session = useSession();

    let authContent:React.ReactNode;

    console.log(session.data?.user?.image)
    if(session.status === "loading"){
        authContent = null;
    }else if(session.data?.user){
        authContent = (
            <Popover>
                <PopoverTrigger >
                    <Avatar>
                        <AvatarImage src={session.data?.user.image || ""} alt={session.data?.user.name || "user"} />
                        <AvatarFallback>
                            {session.data?.user.name?.[0] ?? "U"}
                        </AvatarFallback>
                    </Avatar>
                </PopoverTrigger>

                <PopoverContent>
                    <div className="p-4">
                        <form action={actions.signOut}>
                            <Button type="submit">
                                Sign Out
                            </Button>
                        </form>
                    </div>
                </PopoverContent>
            </Popover>
        )
    }else {
        authContent = (
        <>
            <div>
                <form action={actions.signIn}>
                    <Button type="submit"  variant="secondary">
                        Sign in
                    </Button>
                </form>
            </div>
            <div>
                <form action={actions.signIn}>
                    <Button type="submit" >
                        Sign Up
                    </Button>
                </form>
            </div>
        </>
    );
    }
    return authContent;
}