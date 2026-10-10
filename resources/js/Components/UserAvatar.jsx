// resources/js/Components/UserAvatar.jsx
export default function UserAvatar({ user, className = 'h-10 w-10' }) {
    const src = user.profile_photo
        ? `/storage/${user.profile_photo}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name,
          )}&background=166534&color=ffffff&bold=true`;

    return (
        <img
            src={src}
            alt={user.name}
            className={`${className} rounded-full object-cover`}
        />
    );
}