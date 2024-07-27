"use client";
import ModalPopUp from "@/components/modal/ModalPopUp";
import { academicYears, posts, roles } from "@/constants";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HiPlus, HiUserAdd, HiX } from "react-icons/hi";

const UsersList = () => {
  const [patelians, setPatelians] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [showAddPost, setShowAddPost] = useState("");
  const [showPostFields, setShowPostFields] = useState("");
  const [postName, setPostName] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [session, setSesison] = useState("");

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/user/getUsers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

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
      const res = await fetch("/api/user/updateOneUser", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, field: "role", value: newRole }),
      });

      if (res.ok) {
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
  //     const res = await fetch("/api/user/saveUsers", {
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

  const handleShowAddPost = async (id: string) => {
    setShowPostFields(id);
  };

  const handleAddPostClose = () => {
    setShowAddPost("");
    setShowPostFields("");
    setPostName("");
    setPortfolio("");
    setSesison("");
  };

  const handleAddPost = async (
    index: number,
    post: string,
    portfolio: string,
    session: string
  ) => {
    console.log(post);
    console.log(portfolio);
    console.log(session);
    const newPost = {
      post: post,
      portfolio: portfolio,
      session: session,
    };

    const updatedPatelians = [...patelians];
    updatedPatelians[index].posts.push(newPost);
    const id = updatedPatelians[index]._id;

    console.log("done till ID, now try");

    try {
      const res = await fetch("/api/user/updateOneUser", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          field: "posts",
          value: updatedPatelians[index].posts,
        }),
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

    handleAddPostClose();
  };

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
                        {roles.map((role) => (
                          <option value={role} key={role}>
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
                          onClick={() => setShowAddPost(patelian._id)}
                        >
                          Add Post
                        </button>

                        <ModalPopUp
                          isOpen={showAddPost === patelian._id}
                          onClose={handleAddPostClose}
                        >
                          <div>
                            {patelian.posts.length ? (
                              patelian.posts.map(
                                (post: any, postIndex: number) => {
                                  return (
                                    <div key={postIndex}>
                                      {post.post}
                                      {post.portfolio
                                        ? ` ${post.portfolio}`
                                        : ""}
                                      , {post.session}
                                    </div>
                                  );
                                }
                              )
                            ) : (
                              <div>No Post added!</div>
                            )}

                            <div className="w-full flex justify-end">
                              {showPostFields !== patelian._id ? (
                                <HiPlus
                                  onClick={() =>
                                    handleShowAddPost(patelian._id)
                                  }
                                />
                              ) : (
                                <HiX onClick={() => setShowPostFields("")} />
                              )}
                            </div>

                            {showPostFields === patelian._id && (
                              <div className="w-full flex flex-col gap-3">
                                <select
                                  name="Post"
                                  value={postName}
                                  className="login_form_input"
                                  onChange={(e) => setPostName(e.target.value)}
                                >
                                  {Array.from(posts.keys()).map((key) => (
                                    <option value={key} key={key}>
                                      {key}
                                    </option>
                                  ))}
                                </select>
                                {postName &&
                                  posts.get(postName)?.length !== 0 && (
                                    <select
                                      name="Portfolio"
                                      className="login_form_input"
                                      onChange={(e) =>
                                        setPortfolio(e.target.value)
                                      }
                                    >
                                      {posts
                                        .get(postName)
                                        ?.map((portfolio: string) => (
                                          <option
                                            value={portfolio}
                                            key={portfolio}
                                          >
                                            {portfolio}
                                          </option>
                                        ))}
                                    </select>
                                  )}
                                <select
                                  name="Session"
                                  className="login_form_input"
                                  onChange={(e) => setSesison(e.target.value)}
                                >
                                  {academicYears.map((year: string) => (
                                    <option value={year} key={year}>
                                      {year}
                                    </option>
                                  ))}
                                </select>

                                <div className="w-full flex justify-end">
                                  <button
                                    onClick={() =>
                                      handleAddPost(
                                        index,
                                        postName,
                                        portfolio,
                                        session
                                      )
                                    }
                                    className="bg-primary rounded-lg p-2 text-white"
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </ModalPopUp>
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
