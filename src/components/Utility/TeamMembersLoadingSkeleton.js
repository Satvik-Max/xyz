const TeamMembersLoadingSkeleton = () => {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="text-xs md:text-sm w-full border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-blue-600 text-white uppercase text-sm tracking-wide sticky top-0">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Phone Number</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(4)].map((_, index) => (
            <tr
              key={index}
              className={`text-center ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
            >
              {[...Array(5)].map((_, idx) => (
                <td key={idx} className="border border-gray-300 px-4 py-3">
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4 mx-auto"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamMembersLoadingSkeleton;
