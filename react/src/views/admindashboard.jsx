import React from "react";
import '/src/systemadmincss/admindashboard.css';
//import Logo from "../assets/logo.svg";
import Adminlogo from "../assets/systemadmin/adminlogo.svg";
import Profilepic from "../assets/systemadmin/profilepic.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import ReactApexChart from 'react-apexcharts';


export default function AdminDashboard({data}){
    console.log("this is ",data)
    
    const options = {
        xaxis: {
          categories: props.data.map(entry => entry.label),
        },
      };
    
      const series = [{
        name: 'Series 1',
        data: props.data.map(entry => entry.value),
      }];


    
	return(
   <div className="h-screen overflow-auto main-container">
        <div className="header">
            <div id="logo-image">
            <img
			src={Adminlogo}
			alt="logo"
		/>
            </div>
            <div className="header-list">
            <ul className="list">
                <li className="list-item">Home</li>
                <div className="list-item-dropdown">
                    <li className="list-item-drop">
                        Users 
                    </li>
                    <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon"/>
                </div>
                <div className="list-item-dropdown">
                    <li className="list-item-drop">
                        Transactins   
                    </li>
                    <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
                </div>
                <li className="list-item">Complains & Requests</li>
                <li className="list-item">Table for two</li>
            </ul>
            </div>
            <div className="profile-image">
            <img
			src={Profilepic}
			alt="profilepic"
		    />
            </div>


        </div>

        <div class="inline-flex justify-between w-[80%] h-[120px] mt-[65px] mx-[10%]">

            
             <div class="flex-1 bg-white border-r border-[#D0D5DD] pr-4">
                <div class="grid grid-cols-2 grid-rows-2 gap-4 h-full">
                    <div class=" flex row-span-2 justify-end items-center">
                    <div className="p-3 mr-3 rounded-full bg-[#ECFDF5]">
                        <FontAwesomeIcon icon={faUser} className="text-xl text-[#3EB075]" />
                     </div>
                    </div>
                    <div class=" flex justify-start items-end">
                        <span class="font-inter text-[30px] font-semibold text-[#1B1C1E]">100,000+</span>
                    </div>
                    <div class="flex justify-start items-start">
                        <span class="font-inter text-[18px] font-light text-[#64748B]">Customers</span>
                    </div>
                </div>
             </div>
             
             
             <div class="flex items-center">
                <div class="w-[3px] h-[80%] bg-[#D0D5DD]"></div> 
             </div>
             
             
            <div class="flex-1 bg-white">
            <div class="grid grid-cols-2 grid-rows-2 gap-4 h-full">
                    <div class=" flex row-span-2 justify-end items-center">
                    <div className="p-3 mr-3 rounded-full bg-[#ECFDF5]">
                        <FontAwesomeIcon icon={faUtensils} className="text-xl text-[#3EB075]" />
                     </div>
                    </div>
                    <div class="flex justify-start items-end">
                        <span class="font-inter text-[30px] font-semibold text-[#1B1C1E]">700+</span>
                    </div>
                    <div class="flex justify-start items-start">
                    <span class="font-inter text-[18px] font-light text-[#64748B]">Restaurants</span>
                    </div>
                </div>
            </div>
            

            <div class="flex items-center">
                <div class="w-[3px] h-[80%] bg-[#D0D5DD]"></div> 
             </div> 

             
            <div class="flex-1 bg-white border-l border-[#D0D5DD] pl-4">
            <div class="grid grid-cols-2 grid-rows-2 gap-4 h-full">
                    <div class=" flex row-span-2 justify-end items-center">
                        <div className="p-3 mr-3 rounded-full bg-[#ECFDF5]">
                            <FontAwesomeIcon icon={faStar} className="text-xl text-[#3EB075]" />
                        </div>
                    </div>
                    <div class="flex justify-start items-end">
                    <span class="font-inter text-[30px] font-semibold text-[#1B1C1E]">4.8+</span>
                    </div>
                    <div class="flex justify-start items-start">
                    <span class="font-inter text-[18px] font-light text-[#64748B]">143 Ratings</span>
                    </div>
                </div>
            </div>
        </div>


        <div class="flex bg-red-400 mt-[40px] w-3/5 h-[60vh]">
            
            <ReactApexChart options={options} series={series} type="bar" height={350} />
            
        </div>

        
        
    </div>


	// <div>
	// 	Admin Dashboard
	// </div>
	)
}