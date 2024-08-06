"use client";

import { Avatar, AvatarGroup, DarkModeToggle, FIPlus, Icon, Popover, useVisibility, View } from "@fold-dev/core";
import { useEffect, useState } from "react";
import { UserSelect } from "./user-select";

export default function SelectExample() {
    const { visible, show, hide } = useVisibility(false);
    const [availableUsers, setAvailableUsers] = useState([]);
    const [users, setUsers] = useState([]);

    const handleFilter = async (text: string) => {
        const data = await fetch("https://dummyjson.com/users");
        const { users, total, skip, limit } = await data.json();

        if (users) {
            setAvailableUsers(
                users
                    .map((user) => ({
                        id: user.id,
                        name: user.firstName + " " + user.lastName,
                        image: user.image,
                    }))
                    .filter((user) => user.name.toLowerCase().includes(text.toLowerCase()))
            );
        }
    };

    const handleAdd = (user: any) => {
        setUsers([...users, user]);
    };

    const handleDelete = (user: any) => {
        setUsers(users.filter((u) => user.id != u.id));
    };

    useEffect(() => {
        handleFilter("");
    }, []);

    return (
        <View p="2rem">
            <Popover
                width={300}
                border="none"
                isVisible={visible}
                onDismiss={hide}
                content={
                    <UserSelect
                        availableUsers={availableUsers}
                        onUserFilter={handleFilter}
                        users={users}
                        onAdd={handleAdd}
                        onDelete={handleDelete}
                        onDismiss={hide}
                    />
                }
            >
                <View width="fit-content" radius="var(--f-radius-full)" className="f-buttonize-outline">
                    <AvatarGroup onClick={show}>
                        {users.map((user: any, index: number) => (
                            <Avatar
                                name={user.name}
                                src={user.image}
                                key={index}
                                style={{ border: "2px solid var(--f-color-surface)" }}
                            />
                        ))}
                    </AvatarGroup>

                    {!users.length && (
                        <Avatar onClick={show}>
                            <Icon icon={FIPlus} size="sm" />
                        </Avatar>
                    )}
                </View>
            </Popover>
            <View height="2rem" />
            <DarkModeToggle />
        </View>
    );
}
