import React from "react";
import { assets, dummyTestimonial } from "../Assets/assets";

const TestimonialSection = () => {
  return (
    <div className="pt-16">
      <h1 className="text-2xl font-semibold text-center">Testimonials</h1>
      <p className="text-center text-lg text-gray-500 max-w-2xl mx-auto ">
        {" "}
        Hear from our learners as they share their journeys of transformation,
        success and how our platform has made a difference in their lives
      </p>

      <div className="grid grid-cols-1  md:grid-cols-3 gap-6 px-4  md:px-0 md:my-16 my-10 max-w-6xl  mx-auto ">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg pb-6 text-left  bg-white rounded-lg shadow-[0px_4px_15px_0px] overflow-hidden shadow-black/5 border hover:-translate-y-2 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center space-x-4 px-5 py-4  bg-gray-500/10">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                <p className="text-gray-600">{testimonial.role}</p>
              </div>
            </div>

            <div className="mt-2 px-5 pb-7">
              <div>
                {[...Array(5)].map((_, index) => (
                  <img
                    key={index}
                    src={
                      index < Math.floor(testimonial.rating)
                        ? assets.star
                        : assets.star_blank
                    }
                    className="w-3.5 h-3.5 inline"
                  />
                ))}
              </div>
              <p className="text-gray-700 max-w-xl">{testimonial.feedback}</p>
            </div>
            <a href="#" className="text-blue-500 px-5  underline ">
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;
