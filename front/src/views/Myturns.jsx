import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { turnsAction } from "../redux/slices/atuhSlice";
import { turnsAction } from "../redux/slices/turnSlice";
import DataTable from "../components/DataTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/myturn.module.scss";
import Modal from "../components/Modal";
import TurnsForm from "../components/TurnsForm";
const Myturns = () => {
  const dispatch = useDispatch();
  const turns = useSelector((state) => state.turn.userTurns);
  // const user = useSelector((state) => state.auth.user);
  const userid = useSelector((state) => state.auth.userId);
  const loading = useSelector((state) => state.turn.loading);

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const [turn, setTurns] = useState([]);
  useEffect(() => {
    if (userid) {
      dispatch(turnsAction(userid));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userid]);

  useEffect(() => {
    if (turns && turns.length > 0) {
      setTurns(turns);
    } else {
      setTurns([]);
    }
  }, [turns]);

  return (
    <div className="  w-full p-6 min-h-screen h-auto flex justify-center items-center  bg-rose-200">

      {turn?.length > 0 ? (
        <div className=" w-full bg-white border rounded-lg p-6">
          <button onClick={openModal} className={styles.button}>
            <h2>Agregar turno</h2>
            <FontAwesomeIcon icon={faCalendarPlus} />
          </button>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <TurnsForm></TurnsForm>
          </Modal>
          <DataTable data={turn} />
        </div>
      ) : (
        <div>
          {loading ? (
            <div className="flex justify-center animate-pulse ease-in duration-300">
              Cargando...
            </div>
          ) : (
            <div>
              <button onClick={openModal} className={styles.button}>
                <h2>Agregar turno</h2>
                <FontAwesomeIcon icon={faCalendarPlus} />
              </button>
              <Modal isOpen={isModalOpen} onClose={closeModal}>
                <TurnsForm></TurnsForm>
              </Modal>
              <h1 className="text-3xl font-bold">No hay turnos</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Myturns;
