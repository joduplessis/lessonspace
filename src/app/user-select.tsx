import { Avatar, IconLib, Pill, Select, SelectOption, Text, getKey, useEvent } from "@fold-dev/core";
import { useMemo } from "react";

export type UserSelectUser = {
    id: string | number;
    name: string;
    image?: string;
};

export type UserSelectProps = {
    users: UserSelectUser[];
    onAdd: (user: UserSelectUser) => void;
    onDelete: (user: UserSelectUser) => void;
    availableUsers: UserSelectUser[];
    onUserFilter: (val: string) => void;
    onDismiss: () => void;
};

export const UserSelect = (props: UserSelectProps) => {
    const { users = [], onAdd, onDelete, availableUsers = [], onUserFilter, onDismiss } = props;
    const selected = useMemo(() => users.map((user: UserSelectUser) => user.id), [users]);
    const options: any = useMemo(() => {
        return availableUsers.map((user: UserSelectUser) => ({
            key: user.id,
            label: user.name,
            prefix: <Avatar src={user.image} name={user.name} size="xs" />,
        }));
    }, [availableUsers]);

    const handleUserSelect = (option: SelectOption) => {
        const user = availableUsers.find((availableUser: any) => availableUser.id == option.key);

        if (!!users.find((user: UserSelectUser) => user.id == option.key)) {
            if (user) onDelete(user);
        } else {
            if (user) onAdd(user);
        }
    };

    const handleInputKeyDown = (e) => {
        const { isBackspace } = getKey(e);
        if (isBackspace && !e.target.value) {
            onDelete(users[users.length - 1]);
            onUserFilter("");
        } else if (!e.target.value) {
            onUserFilter("");
        }
    };

    const handleKeyDown = (e) => {
        const { isEscape } = getKey(e);

        if (isEscape) {
            onDismiss();
        }
    };

    useEvent("keydown", handleKeyDown);

    return (
        <Select
            tagInput
            variant="static"
            noListFocus
            trapFocus
            placeholder="Add user"
            selected={selected}
            options={options}
            filterDelay={1000}
            selectListProps={{ noOptionsComponent: <Text p="var(--f-select-option-padding)">No users available</Text> }}
            tagInputFieldProps={{ onKeyDown: handleInputKeyDown }}
            onSelect={(option, dismiss, clear) => {
                clear();
                handleUserSelect(option);
            }}
            onFilter={onUserFilter}
            render={() =>
                users.map((user: UserSelectUser, index: number) => (
                    <Pill
                        subtle
                        key={index}
                        size="sm"
                        prefix={<Avatar src={user.image} name={user.name} size="xs" />}
                        suffix={<IconLib icon="x" className="f-buttonize" onClick={() => onDelete(user)} />}
                    >
                        {user.name}
                    </Pill>
                ))
            }
        />
    );
};
