import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import useNotify from "../../CustomElement/UseNotify"
import { UserAtom } from '../../SharedStates/SharedUserState'
import { useRecoilState } from 'recoil'
import { customAxios } from '../../CustomElement/axios'
import { useLocation } from 'react-router-dom'

const Statistic = () => {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const [user, setUser] = useRecoilState(UserAtom)

    const notify = useNotify()



    const [statistic, setStatistic] = useState({})

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        const getStatis = () => {
            customAxios.get(`/type/getStat`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_tkn}`,
                },
                signal: signal
            }).then((res) => {
                if (res.status == 200) {
                    setStatistic(res.data)
                }
                else {
                    notify("error", "Erreur d'execution de requete")
                }
            })
        }
        customAxios.get(`/type/getStat`, {
            headers: {
                Authorization: `Bearer ${localStorage.access_tkn}`,
            },
            signal: signal
        })
            .then((response) => {
                if (response.data.type && response.data.type == "token") {
                    if (response.data.error.startsWith("The Token has expired on")) {
                        customAxios.get("/tkn/refresh", {
                            headers: {
                                Authorization: `Bearer ${localStorage.refresh_tkn}`,
                            },
                        }).then(async (res) => {
                            if (res.data.type != "token") {
                                localStorage.access_tkn = res.data.access_token
                                localStorage.refresh_tkn = res.data.refresh_token
                                //fn
                                getStatis()
                            }
                            else {
                                setUser({ isLogged: false, id: null, username: null, role: null })
                                localStorage.clid = ""
                            }
                        }).catch((err) => {
                            if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
                        })
                    } else {
                        setUser({ isLogged: false, id: null, username: null, role: null })
                        localStorage.clid = ""
                    }
                }
                else if (response.status == 200) {
                    setStatistic(response.data)
                }
                else {
                    notify("error", "Erreur d'execution de requete")
                }
            })
            .catch((err) => {
                if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
            })
        return () => {
            controller.abort()
        }
    }, [])
    const sum = (element) => {
        var sum = 0
        statistic[element].forEach((element) => {
            sum += Number(Object.values(element)[0])
        })
        return sum
    }
    return (
        <div className="lg:t-w-[79.5%] t-bg-neutral-100/30 lg:t-p-10 t-w-full t-min-h-screen lg:t-ml-auto t-relative lg:t-top-0 t-top-[5rem]">
            <div className='t-w-full'>
                <h1 className='t-tracking-wide t-text-[22px] t-mb-10 t-text-neutral-800 t-font-bold t-text-center lg:t-text-left'>Statistiques Des Marques</h1>
                <div className='t-m-auto t-flex-wrap t-w-full t-flex t-flex-col lg:t-flex-row t-p-5 t-items-center t-justify-around'>
                    {Object.keys(statistic).map((element, index) => {
                        const data = {
                            labels: statistic[element].slice().filter(element => Object.keys(element)[0] != "null").map((element) => Object.keys(element)[0]),
                            datasets: [
                                {
                                    label: '# of Votes',
                                    data: statistic[element].slice().filter(element => Object.keys(element)[0] != "null").map((element) => Object.values(element)[0]),

                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                        'rgba(255, 159, 200, 0.2)',
                                        'rgba(100, 159, 200, 0.2)',
                                        'rgba(100, 50, 200, 0.2)',
                                        'rgba(100, 50, 10, 0.2)',
                                        'rgba(50, 50, 10, 0.2)',
                                        'rgba(50, 10, 10, 0.2)',
                                        'rgba(50, 10, 100,0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)',
                                        'rgba(255, 159, 200, 1)',
                                        'rgba(100, 159, 200, 1)',
                                        'rgba(100, 50, 200, 1)',
                                        'rgba(100, 50, 10, 1)',
                                        'rgba(50, 50, 10, 1)',
                                        'rgba(50, 10, 10, 1)',
                                        'rgba(50, 10, 100,0.2)',
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        };
                        return (<div key={index} className='t-h-full t-mx-5 lg:t-w-[25%] t-mb-10 t-w-full t-bg-white t-shadow-xl t-shadow-neutral-200 t-p-3 t-rounded-xl'>
                            <div className='t-w-full t-flex t-items-center'>
                                <h2 className='t-mb-1 t-text-blue-500 t-font-bold t-tracking-widest t-text-[20px]'>{element}</h2>
                                <p className='t-text-neutral-900 t-font-bold t-ml-auto t-text-[20px] t-tracking-wide'>{sum(element)}</p>
                            </div>
                            <Doughnut
                                data={data}
                                options={{
                                    maintainAspectRatio: true,
                                }}
                            />
                        </div>)
                    })}


                </div>
            </div>
        </div>)
}

export default Statistic