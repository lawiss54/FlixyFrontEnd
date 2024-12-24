import { Card, CardBody } from "@nextui-org/card";
import { useQueryClient } from "@tanstack/react-query";
import {FormTable} from "./Body/Tables.jsx";
import {FormFlixy} from "./Body/Form.jsx";

export const Body = () => {
  

  return (
    <>
      {/* وضع الـ Card ضمن grid، وتحديد الموضع ليأخذ جزء من المساحة */}
      <Card className="order-2 row-start-2 col-start-2 col-span-10  md:row-span-1 md:col-start-3 lg:col-start-3 md:col-span-8 lg:col-span-6 xl:col-span-4 p-6 justify-center items-center place-content-center">
        <CardBody className="">
          <FormFlixy />
        </CardBody>
      </Card>
      
      </>
  );
};