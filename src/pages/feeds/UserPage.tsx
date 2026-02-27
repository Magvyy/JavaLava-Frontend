import { useRef, useState, type MouseEvent } from "react";
import { useParams } from "react-router-dom";
import { useScrollToEnd } from "@/shared/hooks/useScrollToEnd";
import { useProfileUser } from "./hooks/useProfileUser";
import { ProfilePic, User } from "@/features/users";
import { FriendActions } from "@/features/users/components/FriendActions";
import { ReadPost } from "@/features/posts";
import { PostHeader } from "@/features/posts/components/PostHeader";
import { PostContentReader } from "@/features/posts/components/read/PostContentReader";
import { PostFooterReader } from "@/features/posts/components/read/PostFooterReader";
import type { PostResponse } from "@/shared/types/PostApi";
import { useAuth } from "@/contexts/AuthContext";
import { Loader } from "@/shared/components/Loader";
import { FileInput } from "@/features/filedrop/components/FileInput";
import { Button } from "@/components/ui/button";
import { updateProfileApi } from "@/shared/services/users/updateProfileApi";
import type { ProfileUserResponse, UserRequest } from "@/shared/types/UserApi";

export function UserPage() {
	const { userId } = useParams();
	const profileId = Number(userId);
	
    const { authUser } = useAuth();
	const authUserId = (authUser) ? authUser.id : null

	const isSelf = authUserId != null && authUserId === profileId;

	const containerRef = useRef<HTMLDivElement>(null);
	const { data: posts, setData: setPosts, state, reset } = useScrollToEnd<PostResponse>(
		"/posts/user/" + Number(userId),
		containerRef
	);

	const { state: profileState, refetch } = useProfileUser(profileId);


	const onDelete = (del: PostResponse | number) => {
		const temp = posts.filter(post => {
			if (typeof del === "number" && post.id !== del) {
				return post;
			} else if (post.id !== (del as PostResponse).id) {
				return post;
			}
		})
		setPosts(temp);
	};

    const onClickPost = (post: PostResponse) => {
        window.location.href = "/posts/" + post.id;
    }

	const [file, setFile] = useState<File | undefined>(undefined);

	const uploadProfilePicture = async (user: UserRequest) => {
		await updateProfileApi(user, file);
		window.location.href = "/user/" + user.id;
	}

	const makeUserRequest = (profile: ProfileUserResponse): UserRequest => {
		return {
			id: profile.id,
			user_name: profile.user_name
		}
	}
	
	const profileHeader = (
		<div className="w-4/5 flex flex-col items-center justify-between gap-[16px]">
			<Loader state={profileState}>
				{(profileUser) => 
					<>
						<User
							user={profileUser}
							profilePicChild={
								<ProfilePic
									className="w-[200px] h-[200px] rounded-[50%]"
									onClick={(e: MouseEvent<HTMLImageElement>) => {
										e.stopPropagation();
									}}
									user={profileUser}
								/>
							}
							className="flex flex-col gap-[10px] text-center"
						/>
						{isSelf &&
							<>
								<FileInput
									className="w-full h-full flex text-center gap-[5px]"
									setFile={setFile}
									description="Upload profile picture"
								/>
								<Button
									onClick={() => uploadProfilePicture(makeUserRequest(profileUser))}
								>
									Upload
								</Button>
							</>
						}
						{!isSelf && 
							<FriendActions
								profileUser={profileUser}
								onFriendStatusChange={(status) =>
									refetch()
								}
								onVisibilityChange={() => {
									reset();
								}}
							/>
						}
					</>
				}
			</Loader>
		</div>
	);

	const profileFeed = (
		<Loader state={state} data={posts}>
			{(posts, spinner) => 
				<div
					className="h-full p-5 flex flex-col items-center gap-[20px] min-w-[200px] overflow-auto scrollbar-hide"
					ref={containerRef}
				>
						{profileHeader}
						{posts.map(post => (
							<ReadPost
								key={post.id}
								post={post}
								onClick={onClickPost}
								className="w-full p-0 min-w-[350px]"
							>
								<PostHeader
									postId={post.id}
									onDelete={onDelete}
									user={post.user}
								/>
								<PostContentReader
									post={post}
								/>
								<PostFooterReader
									postId={post.id}
									liked={post.liked}
									likeCount={post.like_count}
									commentCount={post.comment_count}
								/>
							</ReadPost>
						))}
					{spinner}
				</div>
			}
		</Loader>
	);

	return (
    <>
        <div className="flex flex-col items-center gap-[16px] w-full">
			{profileFeed}
        </div>
    </>
    );

}