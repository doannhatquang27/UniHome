import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHouseByIdAPI } from "../../../services/house-services";
import useDocumentTitle from "./useDocumentTitle";

interface Props {
  title: string;
}

type Params = {
  id?: string;
};

const ID_LENGTH = 36;

const ComponentWithTitle: React.FC<Props> = ({ title, children }) => {
  const { id } = useParams<Params>();
  const [pageTitle, setTitle] = useState(title);

  useEffect(() => {
    const getRentEntityName = async (id: string) => {
      const newId = id.substring(id.length - ID_LENGTH);
      const result = await getHouseByIdAPI(newId);
      if (result) {
        setTitle(result.name);
      }
    };

    id ? getRentEntityName(id) : setTitle(title);
  }, [id, title]);

  useDocumentTitle(pageTitle);
  return <React.Fragment>{children}</React.Fragment>;
};

export default ComponentWithTitle;
