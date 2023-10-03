import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TextFieldInput from "~/components/input";
import { ArrowLeft, Text } from "iconsax-react";
import ButtonCustom from "~/components/button";
import Link from "next/link";
import { number } from "zod";

interface BookProps {
  isbn: string;
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

interface Response {
  data: CategoryList[];
  message: string;
}

const AddBookPage = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryList[]>([]);
  const [bookData, setBookData] = useState<BookProps>();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/book/category_list");
      const data: Response = (await response.json()) as Response;
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
    fetchCategories().catch((error) => {
      console.error("Terjadi kesalahan:", error);
    });
  }, []);

  const formSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const body: BookProps = {
        isbn: data.isbn as string,
        title: data.title as string,
        author: data.author as string,
        price: data.price as number,
        stock: data.stock as number,
        categoryId: data.categoryId as number,
      };
      const regex = /^0-\d{3}-\d{5}-\d$/;
      if (!regex.test(body.isbn)) {
        alert("ISBN tidak valid");
        return;
      } else {
        const res = await fetch("/api/book/create", {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          alert("Buku berhasil ditambahkan");
          await router.push("/dashboard");
        } else {
          const respon: Response = (await res.json()) as Response;
          alert(respon.message);
        }
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
        Form Penambahan{" "}
        <span className="font-bold text-indigo-700">Buku Baru</span>
      </h1>
      <p className="mt-1 text-gray-400">
        Tambahkan buku baru agar semua orang dapat mulai melihat dunia dengan
        lebih luas{" "}
      </p>
      <div className=" mt-10 h-full w-5/6 rounded-md bg-white px-20 py-14 shadow-sm">
        <form onSubmit={handleSubmit(formSubmit)} className="add-book-form">
          <TextFieldInput
            register={register}
            type="text"
            name="isbn"
            placeholder="ISBN"
          />
          <TextFieldInput
            register={register}
            type="text"
            name="title"
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
            placeholder="Penulis"
          />
          <TextFieldInput
            register={register}
            type="number"
            name="price"
            placeholder="Harga"
          />
          <TextFieldInput
            register={register}
            type="number"
            name="stock"
            placeholder="Stok"
          />
          <ButtonCustom
            text="Tambah Buku"
            backgroundColor="bg-indigo-500"
            color="white"
            hoverBackgroundColor="bg-indigo-700"
          />
        </form>
      </div>
    </div>
  );
};

export default AddBookPage;
