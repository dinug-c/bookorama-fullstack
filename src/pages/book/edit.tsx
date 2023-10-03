/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import TextFieldInput from "~/components/input";
import { ArrowLeft, Text } from "iconsax-react";
import ButtonCustom from "~/components/button";
import Link from "next/link";
import { number } from "zod";

interface BookProps {
  isbn?: string;
  title: string;
  categoryId: number;
  author: string;
  price: number;
  stock: number;
}

interface CategoryList {
  id: number;
  name: string;
}
[];

const EditBookPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [categories, setCategories] = useState<CategoryList[]>([]);
  const [bookData, setBookData] = useState<BookProps>();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchBookData = async () => {
    try {
      const response = await fetch(`/api/book/show?id=${id}`);
      const data = await response.json();
      if (response.ok) {
        setBookData(data.data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/book/category_list");
      const data = await response.json();
      if (response.ok) {
        setCategories(data.data); // Simpan data kategori dalam state
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchBookData();
    }
  }, []);

  const formSubmit = async ({
    title,
    categoryId,
    author,
    price,
    stock,
  }: BookProps) => {
    try {
      const body: BookProps = {
        isbn: id as string,
        title: title,
        author: author,
        price: price,
        stock: stock,
        categoryId: categoryId,
      };
      const res = await fetch("/api/book/update", {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        alert("Buku berhasil diupdate");
        await router.push("/dashboard");
      } else {
        const msg = await res.json();
        alert(msg.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-full w-screen flex-col items-center justify-center bg-indigo-100/50">
      <div className="mx-20 mt-10 flex w-5/6 flex-row ">
        <div className=" flex cursor-pointer flex-row items-start justify-start self-center rounded-full bg-indigo-200 px-6 py-2 font-semibold text-indigo-500">
          <ArrowLeft size={20} color="#6366F1" className="my-auto" />
          <Link className="ml-1" href="/dashboard">
            Kembali
          </Link>
        </div>
      </div>
      <h1 className="text-2xl font-semibold">
        Form Update <span className="font-bold text-indigo-700">Buku</span>
      </h1>
      <p className="mt-1 text-gray-400">
        Mengubah buku sesuai dengan ketentuan yang baru{" "}
      </p>
      <div className=" mt-10 h-full w-5/6 rounded-md bg-white px-20 py-14 shadow-sm">
        <form onSubmit={handleSubmit(formSubmit)} className="add-book-form">
          <TextFieldInput
            register={register}
            type="text"
            name="isbn"
            value={bookData?.isbn}
            isDisabled={true}
            placeholder="ISBN"
          />
          <TextFieldInput
            register={register}
            type="text"
            name="title"
            value={bookData?.title}
            placeholder="Judul"
          />
          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="mt-5 font-semibold text-gray-500"
            >
              Kategori
            </label>
            <select
              id="category"
              value={bookData?.categoryId}
              className="mt-2 h-10 w-full rounded-md border border-gray-300 px-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              {...register("categoryId", { required: true })}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <TextFieldInput
            register={register}
            type="text"
            name="author"
            value={bookData?.author}
            placeholder="Penulis"
          />
          <TextFieldInput
            register={register}
            type="number"
            name="price"
            value={bookData?.price?.toString()}
            placeholder="Harga"
          />
          <TextFieldInput
            register={register}
            type="number"
            name="stock"
            value={bookData?.stock?.toString()}
            placeholder="Stok"
          />
          <ButtonCustom
            text="Edit Buku"
            backgroundColor="bg-indigo-500"
            color="white"
            hoverBackgroundColor="bg-indigo-700"
          />
        </form>
      </div>
    </div>
  );
};

export default EditBookPage;
