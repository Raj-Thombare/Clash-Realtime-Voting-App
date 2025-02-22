"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import axios from "axios";
import { CLASH_URL } from "@/lib/apiEndPoints";
import { clearCache } from "@/app/actions/commonActions";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: number;
  token: string;
};

const DeleteClash = ({ open, setOpen, id, token }: Props) => {
  const [loading, setLoading] = useState(false);

  const deleteClash = async () => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`${CLASH_URL}/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      if (data?.message) {
        setLoading(false);
        clearCache("dashboard");
        toast.success(data?.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong. Please try again!");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will delete your clash from our DB permanently!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteClash} disabled={loading}>
            {loading ? "Processing:." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteClash;
