import { useContext, useState, type ReactNode } from "react"
import type { PageResponse } from "../../../core/domain/models/common/PaginationModels";
import type { UserInfo } from "os";

//// CONTINAUR CON ESTE LOLL; HACER UN PROVIDER PARA EL USUARIO, CON SU INFO, Y FUNCIONES PARA LOGUEAR, DESLOGUEAR, ETC
type Props = {
    children: ReactNode;
}

function UserProvider({ children }: Props) {
    // Basics
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    //Searching
    const [pagedUsers, setPagedUsers] = useState<PageResponse<UserInfo> | null>(null);
    const [searchingUsers, setSearchingUsers] = useState<PageResponse<UserInfo> | null>(null);
    // Refersh Info per modification
    const [modifiedUser, setModifiedUser] = useState<boolean>(false);

    // Rest Methods



}
