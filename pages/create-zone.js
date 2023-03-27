import Page from "../components/Page";
import Button from "../components/Button";
import Field from "../components/Field";
import Input from "../components/Input";
import { useState } from "react";
import { fetchJson } from "../lib/api";
import { useRouter } from 'next/router'

function CreateZonePage() {
  const router = useRouter();
  const [zone, setZone] = useState("");
  const [tariff, setTariff] = useState("");
  const [countries, setCountries] = useState("");
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: false });
    try {
      const response = await fetchJson("/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zone, tariff, countries }),
      });
      setStatus({ loading: false, error: false });
      console.log("create zone:", response);
      router.push('/admin-panel');
    } catch (err) {
      setStatus({ loading: false, error: true });
    }
  };

  return (
    <Page title="Create Zone">
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
          <p className="text-red-700">
            Invalid data
          </p>
        )}
        {status.loading ? (
          <p>Loading...</p>
        ) : (
          <Button type="submit">
           Create
          </Button>
        )}
      </form>
    </Page>
  );
}

export default CreateZonePage;
