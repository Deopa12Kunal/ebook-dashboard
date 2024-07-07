// import React from 'react'
 import { getBooks } from "@/http/api";
 import { useQuery } from "@tanstack/react-query";
//  import Image from "next/image";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge"
 import {

  MoreHorizontal,
  
 
} from "lucide-react";
import { Link } from "react-router-dom";
import { CirclePlus } from 'lucide-react';
import{ Book} from'@/types';
 import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  // DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

 const BooksPage = () => {
   const {data,isLoading,isError } = useQuery(
    {
      queryKey: ['books'],
      queryFn:getBooks,
   staleTime: 10000,
    }
     
  );
  console.log(data);
    
  return (
    <div >
      <div className="flex items-center justify-between">
        <Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Books</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
<Link to ="/dashboard/books/create">
<Button>
  <CirclePlus size={20}/>
<span className="ml-2"></span>
  Add Book</Button>
  </Link>

        </div>
<Card className="mt-5">
                <CardHeader>
                  <CardTitle>Books</CardTitle>
                  <CardDescription>
                    Manage your Books and view their sales performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Genre</TableHead>
                        {/* <TableHead className="hidden md:table-cell">
                          Price
                        </TableHead> */}
                        {/* <TableHead className="hidden md:table-cell">
                          Author Name
                        </TableHead> */}
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data?.data.map((book:Book)=>{
                        return (
 <TableRow key={book._id}> {/* Ensure each TableRow has a unique key */}                        <TableCell className="hidden sm:table-cell">
                          <img
                            alt={book.title}
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={book.coverImage}
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {book.title}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{book.genre}</Badge>
                        </TableCell>
                        {/* <TableCell className="hidden md:table-cell">
                          $499.99
                        </TableCell> */}
                        {/* <TableCell className="hidden md:table-cell">
                        {book.author.n}
                        </TableCell> */}
                        <TableCell className="hidden md:table-cell">
                      {book.createdAt}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      )})} 
  
                     
                      
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter>
              </Card>
</div>
)
};
 export default BooksPage;
