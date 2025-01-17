import { InterchangeList } from "./interchange-list";
import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivateWithAccessToken } from "../../hooks/axios-private-with-access-token";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";

const cities = [
  {
    id: "1",
    name: "New York",
    details:
      "The city that never sleeps, known for its iconic skyline and diverse culture.",
    imageUrl:
      "https://th.bing.com/th/id/R.af364a49971ed89b3abfdb1e614a7d34?rik=EtCfPfyT6iLI2Q&riu=http%3a%2f%2fwww.exway.rda.gov.lk%2fexpressway%2fresources%2fslider%2fslider1%2fdata1%2fimages%2fe02%2f1.jpg&ehk=5n32rWjXLBe47KfkAro7%2bisybCLFpYBhDDb0f8gWNvs%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: "2",
    name: "London",
    details:
      "A historic city blending tradition with modernity, famous for its landmarks and museums.",
    imageUrl:
      "https://tse4.mm.bing.net/th?id=OIP.LMkHH7TOQXZ8DXLSuZk2GAHaEM&rs=1&pid=ImgDetMain",
  },
  {
    id: "3",
    name: "Tokyo",
    details:
      "A bustling metropolis where cutting-edge technology meets ancient traditions.",
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "4",
    name: "Paris",
    details:
      "The City of Light, renowned for its art, fashion, and culinary scene.",
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
];
export const Intercxhanges = () => {
  const axiosPrivateWithAccessToken = useAxiosPrivateWithAccessToken();

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

  return (
    <>
      <InterchangeList
        cities={cities}
        onInterchangeClick={(InterchangeId) => console.log(InterchangeId)}
      />
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};
