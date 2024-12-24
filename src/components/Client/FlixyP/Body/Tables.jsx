import React, { useState } from "react";
import {  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import { Card } from "@nextui-org/card";
import { useClientContext } from "../../../../Context/ClientContext.jsx";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis} from "@/components/ui/pagination";
import { useTranslation } from "react-i18next";


export const FormTable = () => {
  const { Orders } = useClientContext();
  const sortedOrders = Array.isArray(Orders) ? Orders : [];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const {t} = useTranslation();

  // حساب عدد الصفحات
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);

  // استخراج البيانات لكل صفحة
  const currentOrders = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const OrderStatus = ({ status }) => {
    if (status === "En traitement") {
      return (
        <span className="inline-flex items-center text-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
          {t('En traitement')}
        </span>
      );
    } else if (status === "Succès") {
      return (
        <span className="inline-flex items-center text-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
          {t('Succès')}
          
        </span>
      );
    } else if (status === "Échec") {
      return (
        <span className="inline-flex items-center text-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
          {t('Échec')}
          
        </span>
      );
    } else if (status === "Traitement") {
      return (
        <span className="inline-flex items-center text-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
          
          {t('Traitement')}
        </span>
      );
    } else if (status === "Remboursé") {
      return (
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
          
          {t('Remboursé')}
        </span>
      );
    } else if (status === "Vérification manuelle") {
      return (
        <span className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
          
          {t('Vérification manuelle')}
        </span>
      );
    } else {
      return null;
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPaginationItems = () => {
    const paginationItems = [];

    // أول 3 صفحات
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      paginationItems.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // نقاط قبل الصفحات الوسطى
    if (currentPage > 4) {
      paginationItems.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // الصفحات الوسطى
    if (currentPage > 3 && currentPage < totalPages - 2) {
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        paginationItems.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    // نقاط بعد الصفحات الوسطى
    if (currentPage < totalPages - 3) {
      paginationItems.push(
        <PaginationItem key="end-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // آخر 3 صفحات
    for (let i = Math.max(totalPages - 2, 4); i <= totalPages; i++) {
      paginationItems.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return paginationItems;
  };

  return (
    <>
      {/* الجدول */}
      <Card className="order-3 col-start-2 col-span-10 md:col-start-3 lg:col-start-3 md:col-span-8 lg:col-span-6 xl:col-span-4 mt-5 md:h-[40vh]">
        <Table className="w-full md:h-[33vh]">
          <TableCaption>{t('Historique des transactions.')}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">{t('Identifiant de commande')}</TableHead>
              <TableHead>{t('Opérateur')}</TableHead>
              <TableHead>{t('Statut')}</TableHead>
              <TableHead className="text-center">{t('N° de téléphone')}</TableHead>
              <TableHead className="text-center">{t('Le montant')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentOrders.map((order) => (
              <TableRow key={order.order_id}>
                <TableCell className="font-medium">{order.order_id}</TableCell>
                <TableCell>{order.operator}</TableCell>
                <TableCell>
                  <OrderStatus status={order.status} />
                </TableCell>
                <TableCell className="text-center">{order.number}</TableCell>
                <TableCell className="text-center">{order.amount} دج</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination className="flex justify-between items-center w-full p-4 bg-gray-100 rounded-md">
          <PaginationContent className="flex justify-between items-center w-full">
            {/* زر السابق */}
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-2 rounded"
              >
                {t('Précédent')}
              </PaginationPrevious>
            </PaginationItem>
            {/* روابط الصفحات */}
            <div className="flex gap-2 overflow-x-auto">
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-3 py-2 rounded ${
                      currentPage === index + 1
                        ? ""
                        : ""
                    }`}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </div>
            {/* زر التالي */}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-2 rounded"
              >
                {t('Suivant')}
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Card>
    </>
  );
};