import { useRouter } from "next/router";

const DeleteBook = () => {
  const router = useRouter();
  const { isbn } = router.query;

  const handleDelete = () => {
    // Lakukan logika penghapusan buku berdasarkan ISBN
  };

  return (
    <div>
      <h1>Hapus Buku</h1>
      <p>Apakah Anda yakin ingin menghapus buku ini?</p>
      <button onClick={handleDelete}>Hapus</button>
    </div>
  );
};

export default DeleteBook;
