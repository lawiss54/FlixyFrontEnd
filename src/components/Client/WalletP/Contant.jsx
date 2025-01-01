import react from "react";
import { Card, CardBody } from "@nextui-org/card";
import {Body} from "./Body.jsx";
import {HistoTable} from "./Table.jsx";

export const Contant = () => {
  return(
    <>
      <Card className="row-start-3  col-span-10  md:row-span-1 md:col-start-3 lg:col-start-3 md:col-span-8 lg:col-span-6 xl:col-span-4  flex  items-center place-content-center h-auto rounded-3xl backdrop-blur-lg drop-shadow-2xl bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500">
        <CardBody className="h-auto text-white">
          <Body />
        </CardBody>
      </Card>
      <HistoTable />
    </>
  )
};