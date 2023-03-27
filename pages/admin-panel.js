import Head from "next/head";
import Title from "../components/Title";
import Button from "../components/Button";
import Field from "../components/Field";
import Input from "../components/Input";
import { getZones } from "../lib/zones";
import NavBar from "../components/NavBar";
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { useRouter } from "next/router";
import { fetchJson } from "../lib/api";
import { useState } from "react";

export async function getStaticProps() {
  const zones = await getZones();
  return { props: { zones }, revalidate: 5 * 60 }; // seconds
}

export default function AdminPanel({ zones }) {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const [zone, setZone] = useState("");
  const [tariff, setTariff] = useState("");
  const [countries, setCountries] = useState("");
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: false });
    try {
      const response = await fetchJson("/api/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, zone, tariff, countries }),
      });
      setStatus({ loading: false, error: false });
      console.log("updated", response);
      setEdit(false);
      router.push("/admin-panel");
    } catch (err) {
      setStatus({ loading: false, error: true });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetchJson("/api/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      console.log("sign in:", response);
      router.push("/admin-panel");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreate = () => {
    router.push("/create-zone");
  };

  const handleEdit = (id, zone, tariff, countries) => {
    setEdit(true);
    setId(id);
    setZone(zone);
    setTariff(tariff);
    setCountries(countries);
    window.scrollTo(0, 0)
  };

  return (
    <>
      <Head>
        <title>Zone Rates Microservice Admin Panel</title>
      </Head>
      <header>
        <NavBar />
      </header>
      <main className="px-6 py-4 bg-yellow-100 h-screen">
        <Title>Admin Panel</Title>
        <button
          className="bg-sky-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
          onClick={handleCreate}
        >
          Create new entry
        </button>
        {edit && (
          <form onSubmit={handleSubmit}>
            <Field label="Zone">
              <Input
                type="zone"
                required
                value={zone}
                onChange={(event) => setZone(event.target.value)}
              />
            </Field>
            <Field label="Tariff">
              <Input
                type="tariff"
                required
                value={tariff}
                onChange={(event) => setTariff(event.target.value)}
              />
            </Field>
            <Field label="Countries">
              <Input
                type="countries"
                required
                value={countries}
                onChange={(event) => setCountries(event.target.value)}
              />
            </Field>
            {status.error && (
              <p className="text-red-700">Invalid credentials</p>
            )}
            {status.loading ? (
              <p>Loading...</p>
            ) : (
              <Button type="submit">Edit</Button>
            )}
          </form>
        )}
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
            <tr>
              <th scope="col" className="px-6 py-4">
                Id
              </th>
              <th scope="col" className="px-6 py-4">
                Zone
              </th>
              <th scope="col" className="px-6 py-4">
                Tariff
              </th>
              <th scope="col" className="px-6 py-4">
                Countries
              </th>
              <th scope="col" className="px-2 py-4">
                Edit
              </th>
              <th scope="col" className="px-2 py-4">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {zones.flat.map((zone, i) => (
              <tr
                key={i}
                className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
              >
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  {zone.id}
                </td>
                <td className="whitespace-nowrap px-6 py-4">{zone.zone}</td>
                <td className="whitespace-nowrap px-6 py-4">{zone.tariff}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  {zone.countries.join("__")}
                </td>
                <td className="whitespace-nowrap px-2 py-4">
                  <button
                    onClick={() => {
                      handleEdit(
                        zone.id,
                        zone.zone,
                        zone.tariff,
                        zone.countries
                      );
                    }}
                  >
                    <FaPen />
                  </button>
                </td>
                <td className="whitespace-nowrap px-2 py-4">
                  <button
                    onClick={() => {
                      handleDelete(zone.id);
                    }}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
