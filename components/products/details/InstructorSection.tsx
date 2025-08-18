import { ProductStruct } from "@/utils/interfaces";

// Instructor Section
interface InstructorProps {
  instructor: ProductStruct["instructor"];
}

const InstructorSection: React.FC<InstructorProps> = ({ instructor }) => {
  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Meet Your Instructor
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-32 h-32 bg-gradient-to-br from-[#D2145A] to-[#FF4081] rounded-3xl flex items-center justify-center text-6xl mx-auto lg:mx-0 mb-8">
              {instructor.avatar}
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center lg:text-left">
              {instructor.name}
            </h3>
            <div className="space-y-2 mb-6">
              {instructor.credentials.map((credential, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 justify-center lg:justify-start"
                >
                  <div className="w-2 h-2 bg-[#D2145A] rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">
                    {credential}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {instructor.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorSection;
