"use client";
import { roles } from "@/constants";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const UsersList = () => {
  const [patelians, setPatelians] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [showAddPost, setShowAddPost] = useState(false);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/getUsers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data.patelians);

      if (response.ok) {
        setPatelians(data.patelians);
        setError("");
      } else {
        setError(data);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (index: number, newRole: String) => {
    const updatedPatelians = [...patelians];
    updatedPatelians[index].role = newRole;
    const id = updatedPatelians[index]._id;

    try {
      const res = await fetch("/api/updateOneUser", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, field: "role", value: newRole }),
      });

      if (res.ok) {
        console.log(res.json());
        getUserDetails();
      } else {
        console.log(res.json());
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const submitUsers = async () => {
  //   try {
  //     const res = await fetch("/api/saveUsers", {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ patelians }),
  //     });

  //     if (res.ok) {
  //       getUserDetails();
  //     } else {
  //       console.log(res.json());
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="px-1 w-full">
      <div className="mx-auto">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error Encountered</p>
        ) : (
          <div className="overflow-x-auto">
            <div
              className="flex flex-row justify-center text-4xl font-bold mb-3 underline text-primary"
              style={{ fontFamily: "Shango" }}
            >
              Users
            </div>
            <table
              className="table-auto w-full text-left"
              style={{ fontFamily: "Shango" }}
            >
              <thead className="uppercase bg-primary text-xl text-secondary">
                <tr>
                  <th scope="col" className="py-3">
                    Id
                  </th>
                  <th scope="col" className="py-3">
                    Name
                  </th>
                  <th scope="col" className="py-3">
                    Roll no
                  </th>
                  <th scope="col" className="py-3">
                    Role
                  </th>
                  <th scope="col" className="py-3">
                    Email
                  </th>
                  <th scope="col" className="py-3"></th>
                </tr>
              </thead>
              <tbody>
                {patelians.map((patelian: any, index: number) => (
                  <tr key={patelian._id} className="text-xl">
                    <td className="py-3">{patelian._id}</td>
                    <td>
                      <Link
                        href={`/patelian/admin/user/${patelian._id}`}
                        className="text-blue-300 underline"
                      >
                        {patelian.name}
                      </Link>
                    </td>
                    <td className="py-3">{patelian.rollNo}</td>
                    <td>
                      <select
                        value={patelian.role}
                        onChange={(e) =>
                          handleRoleChange(index, e.target.value)
                        }
                      >
                        {roles.map((role, index) => (
                          <option value={role} key={index}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>{patelian.email}</td>

                    {patelian.role === "HCM" && (
                      <td>
                        <button
                          className="bg-primary px-1 m-1 rounded-lg text-secondary"
                          onClick={() => setShowAddPost(!showAddPost)}
                        >
                          Add Post
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
