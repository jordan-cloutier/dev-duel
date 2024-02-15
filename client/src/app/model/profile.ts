export default interface Profile {
    username: string
    name: string
    location: string
    bio: string
    "avatar-url": string
    titles: Array<String>
    "favorite-language": string
    "public-repos": number
    "total-stars": number
    "highest-starred": number
    "perfect-repos": number
    followers: number
    following: number
}