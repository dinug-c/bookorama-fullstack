/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import ButtonCustom from "~/components/button";

interface Book {
  isbn: string;
  title: string;
  category: {
    id: number;
    name: string;
  };
  author: string;
  price: number;
  stock: number;
}
[];

interface MsgProps {
  message: string;
}

const BookPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const cookies = new Cookies();
  const router = useRouter();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Mengupdate nilai pencarian saat input berubah
  };

  const searchBooks = () => {
    if (!searchTerm) {
      return books;
    }
    return books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  };

  const handleEdit = async (isbn: string) => {
    await router.push("/book/edit?id=" + isbn);
  };
  const handleDelete = async (isbn: string) => {
    console.log(isbn);
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus buku ini?",
    );

    if (confirmDelete) {
      try {
        const res = await fetch(`/api/book/delete?isbn=${isbn}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isbn: isbn }),
        });

        if (res.status === 200) {
          alert("Buku berhasil dihapus");
          await router.push("/dashboard");
          await getBooks();
        } else {
          const msg: MsgProps = await res.json();
          alert(msg.message); // Menampilkan pesan kesalahan dari server jika penghapusan gagal
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    }
  };
  const handleAddBook = async () => {
    await router.push("/book/add");
  };
  const getBooks = async () => {
    const res = await fetch("/api/book/dataset", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setBooks(data);
    console.log(data);
  };

  useEffect(() => {
    getBooks().catch((error) => {
      console.error("Terjadi kesalahan:", error);
    });
    if (cookies.get("admin") !== "true") {
      router.push("/").catch((error) => {
        console.error("Terjadi kesalahan:", error);
      });
    }
  }, []);

  return (
    <div className="flex h-full min-h-screen w-screen flex-col items-center justify-center bg-indigo-100/50">
      <h1 className="text-3xl font-semibold">
        Daftar Buku <span className="font-bold text-indigo-700">BookOrama</span>
      </h1>
      <p className="mt-1 text-gray-400">
        Modifikasi dan kostumisasi buku yang tersedia pada BookOrama{" "}
      </p>
      <div className="mt-10 h-full w-5/6 rounded-md bg-white px-20 py-14 shadow-sm">
        <div className="flex w-full flex-row items-center ">
          <div className="mb-5 w-[150px] place-items-center">
            <ButtonCustom
              text="Tambah Buku"
              backgroundColor="bg-indigo-500"
              color="white"
              hoverBackgroundColor="bg-indigo-700"
              onClick={() => {
                handleAddBook().catch((error) => {
                  console.error("Terjadi kesalahan:", error);
                });
              }}
            />
          </div>
          <div className="ml-4 flex-grow">
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Cari buku berdasarkan judul"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <table className="mt-0 min-w-full table-auto">
          <thead>
            <tr>
              <th className="rounded-tl-md rounded-tr-md border bg-indigo-50 px-4 py-2">
                ISBN
              </th>
              <th className="rounded-tl-md rounded-tr-md border bg-indigo-50 px-4 py-2">
                Judul
              </th>
              <th className="rounded-tl-md rounded-tr-md border bg-indigo-50 px-4 py-2">
                Kategori
              </th>
              <th className="rounded-tl-md rounded-tr-md border bg-indigo-50 px-4 py-2">
                Penulis
              </th>
              <th className="rounded-tl-md rounded-tr-md border bg-indigo-50 px-4 py-2">
                Harga
              </th>
              <th className="rounded-tl-md rounded-tr-md border bg-indigo-50 px-4 py-2">
                Stok
              </th>
              <th className="rounded-tl-md rounded-tr-md border bg-indigo-50 px-4 py-2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {searchBooks().map((book) => (
              <tr key={book.isbn}>
                <td className="border px-4 py-2">{book.isbn}</td>
                <td className="border px-4 py-2">{book.title}</td>
                <td className="border px-4 py-2">{book.category.name}</td>
                <td className="border px-4 py-2">{book.author}</td>
                <td className="border px-4 py-2">{book.price}</td>
                <td className="border px-4 py-2">{book.stock}</td>
                <td className="border px-4 py-2">
                  <div className="mx-auto flex flex-row justify-center space-x-2">
                    <button
                      className="rounded bg-blue-500 px-5 py-2 font-semibold text-white transition-all hover:bg-blue-700"
                      onClick={() => {
                        handleEdit(book.isbn).catch((error) => {
                          console.error("Terjadi kesalahan:", error);
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="rounded bg-red-500 px-5 py-2 font-semibold text-white transition-all hover:bg-red-700"
                      onClick={() => {
                        handleDelete(book.isbn).catch((error) => {
                          console.error("Terjadi kesalahan:", error);
                        });
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookPage;
