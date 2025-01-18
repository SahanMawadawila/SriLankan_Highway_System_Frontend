import { InterchangeList } from "./interchange-list";
import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivateWithAccessToken } from "../../hooks/axios-private-with-access-token";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../../components/ui/pagination";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Intercxhanges = () => {
  const axiosPrivateWithAccessToken = useAxiosPrivateWithAccessToken();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 10;

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const getInterchanges = async () => {
    const response = await axiosPrivateWithAccessToken.get(
      "admin/interchanges"
    );
    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["interchanges"],
    queryFn: getInterchanges,
  });

  if (isLoading) return <div>Loading...</div>;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems =
    endIndex > data.length
      ? data.slice(startIndex)
      : data.slice(startIndex, endIndex);

  return (
    <>
      <InterchangeList
        cities={currentItems}
        onInterchangeClick={(InterchangeName) =>
          navigate(`/admin/interchanges/${InterchangeName}`)
        }
      />
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              variant="outline"
            >
              Previous
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button variant="outline" disabled>
              {currentPage}
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              variant="outline"
            >
              Next
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};
