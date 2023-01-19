import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import './Quizcards.css'
function Quizcards() {
    const [ind, setind] = useState(0)
    const [ques, setques] = useState([])
    const [opts, setopts] = useState(['', '', '', ''])
    const [ans, setans] = useState([])
    const [score, setscore] = useState(0)

    useEffect(() => {

        axios.get('https://opentdb.com/api.php?amount=10&type=multiple').then((data) => {

            let x = data.data.results.map((item, i) => {
                return [item.correct_answer, ...item.incorrect_answers]
            })
            let y = data.data.results.map((item, i) => {
                return item.question
            })
            let z = data.data.results.map((item, i) => {
                return item.correct_answer
            })
            setopts(x)
            setques(y)
            setans(z)
        }).catch((e) => console.log(e))
    }, [])

    const checkanswer = (qans) => {
        if (qans === ans[ind]) {
            setscore(score + 1)
        }
    }

    const setindex = () => {
        if (ind < ques.length) {
            setind(ind + 1)
        }
    }

    return (
        <div className='c-wrap'>

            {ind < ques.length ? <>
                <div className="q-wrap">
                    <h1>Question {ind + 1}/{ques.length}</h1>
                    <p>{ques[ind]}</p>
                </div>
                {console.log(score)}
                <div className="o-wrap" >
                    <div className="o-1 o" onClick={() => {
                        setindex()
                        checkanswer(opts[ind][0])
                    }}>{opts[ind][0]}</div>
                    <div className="o-1 o" onClick={() => {
                        setindex()
                        checkanswer(opts[ind][1])
                    }}>{opts[ind][1]}</div>
                    <div className="o-1 o" onClick={() => {
                        setindex()
                        checkanswer(opts[ind][2])
                    }}>{opts[ind][2]}</div>
                    <div className="o-1 o" onClick={() => {
                        setindex()
                        checkanswer(opts[ind][3])
                    }}>{opts[ind][3]}</div>
                </div>
            </> : <>
                <div className="q-wrap">

                    <h4 className='score-head'>YOUR SCORE IS :</h4>
                </div>
                <div className="o-wrap" >
                    <p>{score}/{ques.length}</p>
                </div>
            </>
            }


        </div>
    )
}

export default Quizcards