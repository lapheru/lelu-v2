/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS CHAT NODE
 *
 * Chat exists inside Genesis
 * ==========================================================
 */

import {
  useGenesis,
} from "./GenesisCore";





export default function GenesisChatNode() {


  const genesis =

    useGenesis();





  if (

    genesis.state.minimized

  ) {


    return (

      <button

        onClick={

          genesis.expand

        }

      >

        ✨ Lélu

      </button>

    );

  }





  return (

    <div>


      <header>

        Lélu

        <button

          onClick={

            genesis.minimize

          }

        >

          -

        </button>

      </header>





      <section>

        {

          genesis.state.messages.map(

            message => (

              <p

                key={message.id}

              >

                <b>

                  {message.role}

                </b>

                :

                {message.text}

              </p>

            ),

          )

        }

      </section>





      <nav>


        <button

          onClick={() =>

            genesis.openPanel(

              "history",

            )

          }

        >

          History

        </button>





        <button

          onClick={() =>

            genesis.openPanel(

              "logs",

            )

          }

        >

          Logs

        </button>





        <button

          onClick={() =>

            genesis.openPanel(

              "workspaces",

            )

          }

        >

          Workspaces

        </button>


      </nav>


    </div>

  );

}