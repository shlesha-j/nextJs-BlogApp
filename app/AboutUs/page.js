"use client";

import React, { useEffect } from "react";
import { supabase } from "@/lib/supabase";

function Page() {
  useEffect(() => {
    async function test() {
      const { data, error } = await supabase
        .from("blogs")
        .select("*");

      console.log("DATA:", data);
      console.log("ERROR:", error);
    }

    test();
  }, []);

  return (
    <section>
      <div className="container">AboutUs Page</div>
    </section>
  );
}

export default Page;
