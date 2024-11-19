import { useState, useEffect } from "react";
import { useGetMe } from "@/features/authentication/hooks";
import { useToast } from "@/hooks";
import { editProfileErrorMessages } from "../messages";
import { useNavigate } from "react-router-dom";
import { UseQueryResult } from "react-query";
import { User } from "@/features/authentication/entity";
import { AxiosError } from "axios";

interface IUseProfile {
  getMeQuery: UseQueryResult<
    {
      user: User;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    AxiosError<unknown, any>
  >;
  currentAvatar: string | undefined;
}

export function useProfile(): IUseProfile {
  const { showErrorToast } = useToast();
  const navigate = useNavigate();
  const getMeQuery = useGetMe();
  const [currentAvatar, setCurrentAvatar] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (getMeQuery.data?.user?.avatarSrc) {
      setCurrentAvatar(getMeQuery.data.user.avatarSrc);
    }
  }, [getMeQuery.data]);

  useEffect(() => {
    if (getMeQuery.error) {
      showErrorToast(
        editProfileErrorMessages.getMeError.title,
        editProfileErrorMessages.getMeError.description
      );
      navigate("/");
    }
  }, [getMeQuery.error, navigate, showErrorToast]);

  return { getMeQuery, currentAvatar };
}

